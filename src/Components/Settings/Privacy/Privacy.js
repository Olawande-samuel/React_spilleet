import { Box, Divider, Typography } from "@mui/material";
import Toggle from "../../Switch/Switch";
import Style from "../../../styles/Setting.module.css";
import React from "react"
import { Fetch } from "../../../Trials/Controller";

const Privacy = () => {
    const [loading, setLoading] = React.useState(false)
    const [emailPrivacy, setEmailPrivacy] = React.useState(false)
    const handleEmailFromSpilleet = ()=>{
       setEmailPrivacy(!emailPrivacy)
       console.log("done")
    }
    React.useEffect(()=>{
        const data = localStorage.getItem("user")
        if (data) {
            const user = JSON.parse(data)
        if(emailPrivacy === true) {
            setLoading(true);
            const formData = new FormData();
            formData.append("apptoken", "7FHS8S43N2JF08");
            formData.append("accept", emailPrivacy ? "Yes" :"No")
            formData.append("usertoken", user.usertoken)
      
            Fetch("https://spilleetapi.spilleet.com/updateEmailPrivacy", formData)
              .then((res) => {
                setLoading(false);
                
              })
              .catch((err) => {
                setLoading(false)
              });
        }
    }

    },[emailPrivacy])
    return (
        <Box>
            <Box my={3}  border="1px solid gray"  borderRadius="8px" boxShadow=" 0px 1px 2px rgba(0, 0, 0, 0.25)">
                <div  style={{borderBottom:"1px solid gray", padding:'4px', paddingLeft:"19px"}} className={Style.P_title}>Privacy Settings</div>
                <Box  py={2} pl={3}  >
                    <Box display="flex"  alignItems="center">
                        <Toggle />
                        <Typography className={Style.textValue} ml={2}>Allow your profile to be discovered by email</Typography>
                    </Box>
                </Box>
            </Box>
            {/* <Box my={3} border="1px solid gray"  borderRadius="8px" boxShadow=" 0px 1px 2px rgba(0, 0, 0, 0.25)">
                <div style={{borderBottom:"1px solid gray", padding:'4px',paddingLeft:"19px"}}  className={Style.P_title}>Inbox Preferences</div>
                <Box  py={2}>
                    <form>
                        <fieldset style={{border:"none"}}>
                            <legend className={Style.P_title}>Who can send you messages?</legend>
                            <Box py={1} className={Style.form_control}>
                                <input type="radio" name="inbox" id="anyone" />
                                <label htmlFor="anyone" className={Style.textValue} >Anyone on Spilleet</label>
                            </Box>
                            <Box py={1} className={Style.form_control}>
                                <input type="radio" name="inbox" id="following" />
                                <label htmlFor="following" className={Style.textValue} >People I follow on spilleet</label>
                            </Box>
                            <Box py={1} className={Style.form_control}>
                                <input type="radio" name="inbox" id="noONe" />
                                <label htmlFor="noONe" className={Style.textValue} >No one</label>
                            </Box>
                        </fieldset>
                    </form>
                </Box>
            </Box> */}
            <Box my={3} border="1px solid gray"  borderRadius="8px"  boxShadow=" 0px 1px 2px rgba(0, 0, 0, 0.25)">
                <div style={{borderBottom:"1px solid gray", padding:'4px', paddingLeft:"19px"}}  className={Style.P_title}>Email Preferences</div>
                <Divider />
                <Box  py={2} pl={3}  >
                    <Box display="flex"  alignItems="center">
                        <Toggle handleToggle={handleEmailFromSpilleet} />
                        <Typography className={Style.textValue} ml={2}>Receive emails from Spilleet</Typography>
                    </Box>
                </Box>
            </Box>
            <Box my={3} border="1px solid gray"  borderRadius="8px"  boxShadow=" 0px 1px 2px rgba(0, 0, 0, 0.25)">
                <div style={{borderBottom:"1px solid gray", padding:'4px', paddingLeft:"19px"}}  className={Style.P_title}>Comment Preferences</div>
                <Divider />
                <Box  py={2} pl={3}  >
                    <Box display="flex"  alignItems="center">
                        <Toggle />
                        <Typography className={Style.textValue} ml={2}>Allow your profile to be discovered by email</Typography>
                    </Box>
                </Box>
            </Box>
            <Box my={3} border="1px solid gray"  borderRadius="8px"  boxShadow=" 0px 1px 2px rgba(0, 0, 0, 0.25)">
                <div style={{borderBottom:"1px solid gray", padding:'4px', paddingLeft:"19px"}}  className={Style.P_title}>Translation Preferences</div>
                <Divider />
                <Box  py={2} pl={3}  >
                    <Box display="flex"  alignItems="center">
                        <Toggle />
                        <Typography className={Style.textValue} ml={2}>Allow other people to translate your content in other languages</Typography>
                    </Box>
                </Box>
            </Box>
            <Box my={3} border="1px solid gray"  borderRadius="8px" boxShadow=" 0px 1px 2px rgba(0, 0, 0, 0.25)">
                <div style={{borderBottom:"1px solid gray", padding:'4px', paddingLeft:"19px"}}  className={Style.P_title}>Delete or Deactivate Your Account</div>
                <Divider />
                <Box >
                    <p className={Style.actions}>Delete Account</p>
                    <p className={Style.actions}>Deactivate Account</p>
                </Box>
            </Box>
            
        </Box>
    )
}

export default Privacy
