import React, {useState} from 'react'

import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

function MdeEditor(props) {
    const [value, setValue] = useState("");
    const [selectedTab, setSelectedTab] = React.useState("write");

    const handleChanges = (event)=>{
      props.parentCallback(event.target.value);
      event.preventDefault();
    }

    return (
        <div {...props}>
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(<ReactMarkdown source={markdown} />)
                  }
                childProps={{
                    writeButton: {
                        tabIndex: -1
                    },
                    textArea:{
                        name: "mdeEditor",
                        onChange: handleChanges ,
                        placeholder: props.placeholder
                    }
                }}
            >

            </ReactMde>
        </div>
    )
}

export default MdeEditor;
