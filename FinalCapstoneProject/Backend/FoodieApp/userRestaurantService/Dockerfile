FROM openjdk:11-jre-slim
WORKDIR usr/lib
ENV MONGO_DATABASE=FoodieUser2
ENV MONGO_URL=mongodb://localhost:27017/FoodieUser2
ADD ./target/userRestaurantService-0.0.1-SNAPSHOT.jar /usr/lib/userRestaurantService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","UserProductService-0.0.1-SNAPSHOT.jar"]