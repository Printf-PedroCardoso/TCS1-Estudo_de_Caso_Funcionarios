# ==============================================================================
# Dockerfile - Sistema de Gestão de Funcionários
# Servidor web leve baseado em Nginx Alpine para servir a aplicação
# ==============================================================================

FROM nginx:alpine

# Define o diretório de trabalho no container
WORKDIR /usr/share/nginx/html

# Remove arquivos estáticos padrões do Nginx
RUN rm -rf ./*

# Copia os arquivos do projeto para o diretório padrão do Nginx
COPY index.html ./
COPY css/ ./css/
COPY js/ ./js/

# Expõe a porta 80 do container
EXPOSE 80

# Inicia o servidor Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
