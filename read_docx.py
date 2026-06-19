import zipfile
import xml.etree.ElementTree as ET

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as z:
            xml_content = z.read('word/document.xml')
            root = ET.fromstring(xml_content)
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            # The text is stored in <w:t> elements
            texts = []
            for node in root.iter(f'{{{ns["w"]}}}t'):
                if node.text:
                    texts.append(node.text)
            
            print('\n'.join(texts))
    except Exception as e:
        print(f"Error: {e}")

extract_text_from_docx(r'D:\Website\Products\Products placement.docx')
