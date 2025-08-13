FROM openjdk:17-jdk-slim

WORKDIR /app

RUN echo '#!/bin/bash\necho "API Gateway placeholder - listening on port 3001"\nwhile true; do echo -e "HTTP/1.1 200 OK\n\n{\"status\":\"ok\",\"service\":\"api-gateway\"}" | nc -l -p 3001; done' > start.sh
RUN chmod +x start.sh

EXPOSE 3001

CMD ["./start.sh"]
