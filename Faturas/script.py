import pdfplumber
import re
import locale
import json
import glob
import datetime


locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')

reference_row = r'Valor\sa\spagar\s\(R\$\)\s*([\w ]+\s+)\s(\w+\/\d{4})\s+(\d{2}\/\d{2}\/\d{4})\s+(\d+\,\d+)' #ok
client_number_regex = r'Nº DA INSTALAÇÃO \d+\.\d+\.\d{4}\sàs\s\d{2}\:\d{2}:\d{2}\s*(\d*)\s*(\d*)'
eletric_energy = r"Energia Elétrica kWh\s+(\d+)\s+(\d\,\d+)\s+(\d+\,\d+)\s+(\d\,\d+)"
energy_scee_icms = r'Energia\sSCEE\ss\/\sICMS\skWh\s+(\d+\.?\d+)\s+(\d+\,\d+)\s+(\d+\,\d+)\s+(\d+\,\d+)'
energy_gdi = r'Energia compensada\sGD\sI\skWh\s*(\d+\.?\d*)\s*(\d+\,?\d*)\s*(\-?\d+\,?\d+)\s*(\d+\,?\d+)'
city_contribution = r'Contrib\sIlum\sPublica\sMunicipal\s*(\d+\,?\d+)'

class EnergyMetric:
    def __init__(self, kwh: int, price: float) -> None:
        self.kwh = kwh
        self.price = price

    def to_json(self):
        return {
            "kwh": self.kwh,
            "price": self.price
        }

class Invoice:

    def __init__(self, client_number: str, reference_day: str, 
                 due_date: str, price: float, 
                 energy_eletric: EnergyMetric, energy_scee_icms: EnergyMetric, energy_gdi: EnergyMetric, city_contribution: float) -> None:
        
        self.client_number = client_number
        self.reference_date = reference_day
        self.due_date  = due_date
        self.price  = price
        self.energy_eletric = energy_eletric
        self.energy_scee_icms = energy_scee_icms
        self.energy_gdi = energy_gdi
        self.city_contribution = city_contribution
    
    def to_json(self):
        return {
            "client_number": self.client_number,
            "reference_date": self.reference_date,
            "due_date": self.due_date,
            "price": self.price,
            "energy_eletric": self.energy_eletric.to_json(),
            "energy_scee_icms": self.energy_scee_icms.to_json(),
            "energy_gdi": self.energy_gdi.to_json(),
            "city_contribution": self.city_contribution,
            "scrape_date": datetime.datetime.now().isoformat()
        }


def parse_number(value: str):
    return locale.atof(value)

def parse_eletric_metric(kwh: str, price: str) -> EnergyMetric:
    price_value = parse_number(price)
    kwh_value = parse_number(kwh)
    return EnergyMetric(kwh_value, price_value)


def build_invoice(text: str) -> str:

    reference_matcher = re.search(reference_row, text, re.MULTILINE).groups()
    client_number_matcher = re.search(client_number_regex, text, re.MULTILINE).groups()
    electric_energy_matcher = re.search(eletric_energy,  text, re.MULTILINE).groups()
    energy_scee_icms_matcher = re.search(energy_scee_icms, text, re.MULTILINE).groups()
    energy_gdi_matcher = re.search(energy_gdi, text, re.MULTILINE).groups()
    city_contribution_matcher = re.search(city_contribution, text, re.MULTILINE).groups()

    energy_eletric_metric = parse_eletric_metric(electric_energy_matcher[0], electric_energy_matcher[1])
    energy_scee_icms_metric = parse_eletric_metric(energy_scee_icms_matcher[0], energy_scee_icms_matcher[1])
    energy_gdi_metric = parse_eletric_metric(energy_gdi_matcher[0], energy_gdi_matcher[1])

    city_tax = parse_number(city_contribution_matcher[0])
    price = parse_number(reference_matcher[3])

    invoice = Invoice(client_number_matcher[0], reference_matcher[1], reference_matcher[2], 
                              price, energy_eletric_metric, energy_scee_icms_metric, energy_gdi_metric, city_tax) 
            
    return invoice

def retrieve_invoice_data(filename):
    with pdfplumber.open(filename) as pdf:
        # iterate over each page
        for page in pdf.pages:
            data = page.extract_text_simple()
            invoice = build_invoice(data)
            return invoice


if __name__ == "__main__":
    files = glob.glob("*.pdf")
    invoices = []
    for file in files:
        data = retrieve_invoice_data(file).to_json()
        data["filename"] = file
        invoices.append(data)

    print(json.dumps(invoices, sort_keys=True, indent=4))