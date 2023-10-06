# 베이스 이미지 설정
FROM ubuntu:latest

ENV FLAG="LAYER7{Pr0t0_1s_m1n3}"

# 필요한 패키지 설치
RUN apt-get update && \
    apt-get install -y mysql-server curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Node.js 설치 및 app.js 파일 추가
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD service mysql start && mysql < /app/mysql_setup.sql && npm start
