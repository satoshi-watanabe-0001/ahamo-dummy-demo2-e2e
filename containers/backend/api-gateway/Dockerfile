FROM openjdk:17-jdk-slim

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

RUN chmod +x ./gradlew
RUN ./gradlew build -x test

EXPOSE 3001

CMD ["java", "-jar", "build/libs/ahamo-dummy-demo2-api-gateway-1.0.0-SNAPSHOT.jar"]
