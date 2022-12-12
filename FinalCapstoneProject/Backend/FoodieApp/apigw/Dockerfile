FROM openjdk
WORKDIR usr/src
EXPOSE 9000
ADD ./target/apigw-0.0.1-SNAPSHOT.jar /usr/src/apigw-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","apigw-0.0.1-SNAPSHOT.jar"]