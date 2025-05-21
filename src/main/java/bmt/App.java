package bmt;

// Spring Boot core imports
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Spring Web imports (for creating REST endpoints, if you decide to add them later)
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
// @SpringBootApplication is a convenience annotation that adds:
// 1. @Configuration: Tags the class as a source of bean definitions for the application context.
// 2. @EnableAutoConfiguration: Tells Spring Boot to start adding beans based on classpath settings,
//    other beans, and various property settings. For example, if you have spring-webmvc on the classpath,
//    this annotation flags the application as a web application and sets up a Tomcat server.
// 3. @ComponentScan: Tells Spring to look for other components, configurations, and services
//    in the 'bmt' package (and its sub-packages), allowing it to discover your @RestController.

@RestController
// @RestController is a convenience annotation that combines @Controller and @ResponseBody.
// It's used for building RESTful web services. When you return a String or an object from
// a method in a @RestController, Spring automatically converts it into the response body.
// For your static files (HTML, CSS, JS), you don't necessarily need this, but it's good
// practice for any future API endpoints you might add.
public class App {

    public static void main(String[] args) {
        // This is the main method that serves as the entry point for your Spring Boot application.
        // SpringApplication.run() bootstraps and launches the application, including the embedded web server.
        SpringApplication.run(App.class, args);
        System.out.println("Spring Boot Application with Shopping Cart UI Started! Access it at http://localhost:8080/");
        System.out.println("You can also try the API endpoint: http://localhost:8080/hello");
    }

    /**
     * This is a simple example of a REST API endpoint.
     * When your Spring Boot application is running, if you open your web browser
     * and navigate to http://localhost:8080/hello, this method will be executed
     * and it will return the String "Hello from Spring Boot!" as the response.
     * Your frontend JavaScript could call this kind of endpoint to get data from the backend.
     *
     * Note: Spring Boot will automatically serve your index.html from http://localhost:8080/
     * because it's located in src/main/resources/static/.
     */
    @GetMapping("/hello") // Maps HTTP GET requests to the /hello path
    public String helloWorld() {
        return "Hello from Spring Boot!";
    }
}