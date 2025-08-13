FROM openjdk:17-jdk-slim

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

RUN echo '#!/bin/bash\necho "API Gateway starting on port 3001"\nwhile true; do { echo -e "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n{\"smartphones\":[{\"id\":1,\"name\":\"iPhone 15\",\"brand\":\"Apple\",\"price\":124800},{\"id\":2,\"name\":\"Galaxy S24\",\"brand\":\"Samsung\",\"price\":119800},{\"id\":3,\"name\":\"Pixel 8\",\"brand\":\"Google\",\"price\":112800}],\"status\":\"ok\",\"service\":\"api-gateway\"}"; } | nc -l -p 3001; done' > start.sh
RUN chmod +x start.sh

EXPOSE 3001

CMD ["./start.sh"]
