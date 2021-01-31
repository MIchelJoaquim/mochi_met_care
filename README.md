# Teste de aptidão Mochi
Entrega do teste proposto pela Mochi

## Objectivos
[x] Um endpoint para criar um usuário

[x] Um endpoint para fazer upload de um PDF, que o anexa ao usuário criado anteriormente e envia um e-mail ao usuário

## Tecnologias usadas
[x] Node LTS (ES6+)

[x] DynamoDB

[x] Lambda
    
[x] S3

[x] API Gateway

[X] SES

## Funções Lambda
* save

   Esta função é acionada a partir do endpoint: 
   
   url: https://dcmvgj4v69.execute-api.us-east-1.amazonaws.com/dev/user
   
   metódo: POST
   
   tendo como valores no corpo da requisição:
   
      * nome
      * email

* upload

   Esta função é acionada a partir do endpoint: 
   
   url: https://dcmvgj4v69.execute-api.us-east-1.amazonaws.com/dev/upload
   
   metódo: POST
   
   tendo como valores no corpo da requisição:
   
      * file - ficheiro pdf codificado em base64
      * mime - formato do ficheiro que deve ser application/pdf
      * email
