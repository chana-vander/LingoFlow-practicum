import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Alert } from "@mui/material";
import { motion } from "framer-motion";
import '../css/home.css'
// תמונות
import logoImage from '../images/logo-online.jpg';  // נתיב הלוגו

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState(""); // הודעה למשתמש

    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user);
    }, []);

    const handleProtectedClick = (path: string) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            setMessage("עליך להתחבר כדי לגשת לאזור זה.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (<>
        <Box className="home-container"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                color: "white",
                overflow: "hidden",
                // height: "100%",
                // width: "100%",
                // top:"0px"
            }} >
            <Box sx={{ width: '100vw', display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
                {/* HEADER */}
                <AppBar position="static" sx={{ bgcolor: "#0d47a1", padding: 1, width: "100%" }}>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        {/* צד שמאל - שם האפליקציה עם לוגו וכפתורי הרשמה והתחברות */}
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
                            <img src={logoImage} alt="LingoFlow Logo" style={{ width: 40, height: 40 }} />
                            <Typography variant="h6" fontWeight="bold">LingoFlow</Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 1 }}>
                                {/* כפתורי הרשמה והתחברות */}
                                {!isLoggedIn ? (
                                    <>
                                        <Button color="inherit" sx={{ color: '#d32f2f' }} onClick={() => navigate("/register")}>הרשמה</Button>
                                        <Button color="inherit" sx={{ color: '#d32f2f' }} onClick={() => navigate("/login")}>התחברות</Button>
                                    </>
                                ) : (
                                    <Button color="inherit" onClick={() => { localStorage.removeItem("user"); setIsLoggedIn(false); }}>התנתקות</Button>
                                )}
                            </Box>
                        </Box>

                        {/* צד ימין - כפתורים לפיצ'רים בשורה */}
                        <Box sx={{ display: "flex", gap: 3, padding: "20px", marginRight: "20px" }}>
                            <Button color="inherit" onClick={() => handleProtectedClick("/feedback")}>
                                צפייה במשוב
                            </Button>
                            <Button color="inherit" onClick={() => handleProtectedClick("/record")}>
                                התחלת הקלטה
                            </Button>
                            <Button color="inherit" onClick={() => handleProtectedClick("/choose-level")}>
                                נושאי שיחה
                            </Button>
                            <Button color="inherit" onClick={() => handleProtectedClick("/abaut-us")}>
                                הדרך לדיבור שוטף
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* הודעת שגיאה */}
                {message && (
                    <Alert severity="warning" sx={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)" }}>
                        {message}
                    </Alert>
                )}
            </Box>
        </Box>
    </>)
}
export default Header