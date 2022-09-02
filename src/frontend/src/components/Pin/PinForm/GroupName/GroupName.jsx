import React from 'react';
import {Autocomplete, makeStyles, TextField} from "@mui/material";
import cl from "./GroupName.module.css";



function GroupName({options, value, setGroupName}) {

    return (
        <div>
            <Autocomplete
                freeSolo
                renderInput={
                    (params) => <TextField {...params} label="Группа" variant="outlined" />
                }
                options={options}
                value={value}
                className={cl.GroupName}
                onInputChange={(event, newInputValue) => {
                    setGroupName(newInputValue);
                }}
            />
        </div>
    );
}

export default GroupName;