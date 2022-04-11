Documentação da Api
https://documenter.getpostman.com/view/12134662/UVyytDGd#fb65a3d5-b244-46df-91a8-1017b013681e

Para migrar a database para o server MySql local e necessário inserir o seguinte comando no Console do Gerenciador de Pacotes ou CLI do DotNet
>>> dotnet ef database update

O server foi configurado na porta 3306, usuario -> root e senha -> 1234. Pode se encontrar tais configuracões na String de configuracao no arquivo launchSettings.json
dentro da pasta Properties do projeto.

Github do projeto
https://github.com/euqIrn3h/WebApp_ReactJs_Consumindo_CRUD_DotNet-.git