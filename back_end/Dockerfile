FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle settings.gradle ./

# Windows 줄바꿈을 처리합니다.
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew

COPY src ./src

RUN ./gradlew --no-daemon test bootJar

RUN mkdir -p /out \
    && cp build/libs/*.jar /out/app.jar

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /out/app.jar ./app.jar

USER 10001:10001

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]