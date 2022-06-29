package com.androsov.pinboard.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
    @GetMapping("/api/create")
    public String create() {
        return """
                Mapping method for creation number of pins.<br />
                @param pinsToCreate - array of pins in JSON style. (id will be generated automatically)<br />
                @return Response body contains array of id for each of pins in given order. (also JSON)<br />
                <br />
                example of request body:<br />
                <br />
                [<br />
                  {<br />
                    "id": 100,<br />
                    "group_name": "test",<br />
                    "description": "do something...",<br />
                    "color": "green",<br />
                    "author": "dictator_zx",<br />
                    "date_creation": "2022-06-29",<br />
                    "date_completion": "2022-06-30",<br />
                    "date_deadline": "2022-06-30",<br />
                    "priority": 1,<br />
                    "status": "done"<br />
                  },<br />
                  {<br />
                    "group_name": "test2",<br />
                    "description": "don't do something",<br />
                    "color": "red",<br />
                    "author": "dictator_zx",<br />
                    "date_creation": "2022-06-29",<br />
                    "priority": 2,<br />
                    "status": "done2"<br />
                  }<br />
                ]<br />
                """;
    }
}
