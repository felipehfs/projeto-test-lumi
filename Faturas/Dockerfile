FROM python:3

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y locales && \
    sed -i -e 's/# pt_BR.UTF-8 UTF-8/pt_BR.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales

ENV LANG pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8

# Install dependencies:
RUN pip install pdfplumber
COPY . .

CMD ["python", "script.py"]