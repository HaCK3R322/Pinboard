import React from 'react';
import cl from "../PinForm.module.css";
import {makeStyles, TextField} from "@mui/material";

function Description({description, setDescription}) {

    // TODO: когда-нибудь я сделаю это не так костыльно, но не моя вина что гандоны Mui не могут реализовать
    // фиксированную высоту для TextareaAutosize
    let rows = window.innerHeight * 0.4 / 20 - 1;

    return (
        <div>
            <TextField
                name="description"
                multiline
                variant={"outlined"}
                label="Текст"
                defaultValue={description}
                onChange={(event) => {
                    setDescription(event.target.value)}
                }
                sx={{
                    position: "absolute",
                    top: "3%",
                    left: "50%",
                    transform: 'translateX(-50%)',
                    width: "80%",
                    "& .MuiInputBase-root": {
                        height: '85%'
                    }
                }}
                minRows={1}
                maxRows={rows}
            />
        </div>
    );
}

export default Description;