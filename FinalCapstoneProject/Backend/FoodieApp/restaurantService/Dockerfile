FROM openjdk:11-jre-slim
WORKDIR usr/lib
ENV MONGO_DATABASE=Restaurant
ENV MONGO_URL=mongodb://localhost:27017/Restaurant
ADD ./target/restaurantService-0.0.1-SNAPSHOT.jar /usr/lib/restaurantService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","UserProductService-0.0.1-SNAPSHOT.jar"]