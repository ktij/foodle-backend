import boto3
import sys
import urllib


def get_rows_columns_map(table_result, blocks_map):
    rows = {}
    for relationship in table_result['Relationships']:
        if relationship['Type'] == 'CHILD':
            for child_id in relationship['Ids']:
                cell = blocks_map[child_id]
                if cell['BlockType'] == 'CELL':
                    row_index = cell['RowIndex']
                    col_index = cell['ColumnIndex']
                    if row_index not in rows:
                        # create new row
                        rows[row_index] = {}
                        
                    # get the text value
                    rows[row_index][col_index] = get_text(cell, blocks_map)
    return rows


def get_text(result, blocks_map):
    text = ''
    if 'Relationships' in result:
        for relationship in result['Relationships']:
            if relationship['Type'] == 'CHILD':
                for child_id in relationship['Ids']:
                    word = blocks_map[child_id]
                    if word['BlockType'] == 'WORD':
                        text += word['Text'] + ' '
                    if word['BlockType'] == 'SELECTION_ELEMENT':
                        if word['SelectionStatus'] =='SELECTED':
                            text +=  'X '    
    return text


def get_table_csv_results(url):

    response = urllib.request.urlopen(url).read()
    bytes_test = bytearray(response)

    # process using image bytes
    # get the results
    client = boto3.client('textract')

    response = client.analyze_document(Document={'Bytes': bytes_test}, FeatureTypes=['TABLES'])

    # Get the text blocks
    blocks=response['Blocks']
    # pprint(blocks)

    blocks_map = {}
    table_blocks = []
    for block in blocks:
        blocks_map[block['Id']] = block
        if block['BlockType'] == "TABLE":
            table_blocks.append(block)

    if len(table_blocks) <= 0:
        return "<b> NO Table FOUND </b>"

    csv = ''
    for index, table in enumerate(table_blocks):
        csv += generate_table_csv(table, blocks_map, index +1)
        csv += '\n\n'

    return csv

def generate_table_csv(table_result, blocks_map, table_index):
    rows = get_rows_columns_map(table_result, blocks_map)

    table_id = 'Table_' + str(table_index)
    
    # get cells.
    csv = 'Table: {0}\n\n'.format(table_id)

    for row_index, cols in rows.items():
        
        for col_index, text in cols.items():
            csv += '{}'.format(text) + ","
        csv += '\n'
        
    csv += '\n\n\n'
    return csv

def parse(table_csv):
    # process
    tmp = table_csv.split("\n")
    l = []
    for i in tmp:
        if "," in i:
            l.append(i.strip())
    
    # remove empty cols
    boolOnlyCommaAtStart = True
    boolOnlyCommaAtEnd = True
    for i in l: # for each line
        if i[0] != ",": # if no comma at start
            boolOnlyCommaAtStart = False
        if i[-1] != ",": # if no comma at end
            boolOnlyCommaAtEnd = False
    if boolOnlyCommaAtStart:
        for i in range(len(l)):
            l[i] = l[i][1:]
    if boolOnlyCommaAtEnd:
        for i in range(len(l)):
            l[i] = l[i][:-1]
    
    # create matrix
    for i in range(len(l)):
        l[i] = l[i].split(',')
    # strip each item
    for i in range(len(l)):
        for o in range(len(l[0])):
            l[i][o] = l[i][o].strip()
    l[0][0] = "Nutrient"
    
    
    columns = l[0]
    rows = []
    for i in range(1, len(l)):
        d = {}
        for o in range(len(columns)):
            d[columns[o]] = l[i][o]
        rows.append(d)
    
    print(columns)
    print(rows)

def main(url):
    table_csv = get_table_csv_results(url)
    parse(table_csv)

if __name__ == "__main__":
    url = sys.argv[1]
    main(url)