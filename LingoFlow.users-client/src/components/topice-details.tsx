//MUI
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Word from "../models/word";
import { Container, Typography, Box, List, ListItem, IconButton, Grid, Divider, CircularProgress } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTheme } from "@mui/material/styles";

const Details = () => {
    const { id } = useParams();
    const [words, setWords] = useState<Word[]>([]);
    const [topicName, setTopicName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
    const [paused, setPaused] = useState<boolean>(false);

    const theme = useTheme();

    useEffect(() => {
        fetch(`http://localhost:5092/api/Word/Topic/${id}`)
            .then(response => response.json())
            .then(data => {
                setWords(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching words:', error);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5092/api/Topic/${id}`)
            .then(res => res.json())
            .then(data => setTopicName(data.name))
            .catch(error => console.error('Error fetching topic name: ', error));
    }, [id]);

    const playAudio = (text: string) => {
        stopAudio();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.onend = () => {
            setSpeech(null);
            setPaused(false);
        };
        window.speechSynthesis.speak(utterance);
        setSpeech(utterance);
    };

    const stopAudio = () => {
        if (speech) {
            window.speechSynthesis.cancel();
            setSpeech(null);
            setPaused(false);
        }
    };

    const pauseAudio = () => {
        if (speech && !paused) {
            window.speechSynthesis.pause();
            setPaused(true);
        }
    };

    const resumeAudio = () => {
        if (paused) {
            window.speechSynthesis.resume();
            setPaused(false);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ marginTop: 5 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: theme.palette.primary.main, marginBottom: 3 }}>
                {topicName} Vocabulary
            </Typography>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ padding: 3 }}>
                    <List>
                        {words.length > 0 ? (
                            words.map((word, index) => (
                                <ListItem key={index} sx={{ paddingY: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={1}>
                                            <Typography variant="h6" color="textSecondary" sx={{ textAlign: "right" }}>
                                                {index + 1}.
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
                                                {word.name}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
                                                {word.translation}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={1}>
                                            <IconButton onClick={() => playAudio(word.name)} color="primary">
                                                <VolumeUpIcon />
                                            </IconButton>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider sx={{ marginY: 1 }} />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography variant="body1" sx={{ fontStyle: "italic", color: theme.palette.text.primary }}>
                                                {word.sentence}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                                                {word.sentenceTranslate}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={1}>
                                            <IconButton onClick={() => playAudio(word.sentence)} color="primary">
                                                <VolumeUpIcon />
                                            </IconButton>
                                        </Grid>

                                        <Grid item xs={1}>
                                            <IconButton onClick={pauseAudio} color="primary">
                                                <StopIcon />
                                            </IconButton>
                                        </Grid>

                                        <Grid item xs={1}>
                                            <IconButton onClick={resumeAudio} color="success">
                                                <PlayArrowIcon />
                                            </IconButton>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <Divider sx={{ marginY: 1 }} />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body1" color="textSecondary" align="center">
                                לא נמצאו מילים.
                            </Typography>
                        )}
                    </List>
                </Box>
            )}
        </Container>
    );
};

export default Details;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Word from "../models/word";

// const Details = () => {
//     const { id } = useParams(); // 👈 שליפת ה-id מהנתיב
//     const [words, setWords] = useState<Word[]>([]);
//     const [subjectname, setSubjectName] = useState<string>("");

//     useEffect(() => {
//         // דמוי קריאה ל-API כדי להוריד את נושאי השיחה
//         fetch(`http://localhost:5092/api/Word/subject/${id}`) // כתובת ה-API שמחזירה את נושאי השיחה
//             .then(response => response.json())
//             .then(data => setWords(data))
//             .catch(error => console.error('Error fetching words:', error));
//     }, [id]);

//     useEffect(() => {
//         fetch(`http://localhost:5092/api/Subject/${id}`)
//             .then(res => res.json())
//             .then(data => setSubjectName(data.name))
//             .catch(error => console.error('Error fetching subject name: ', error));
//     }, [id]);

//     return (<>
//         <h1>{subjectname}</h1>
//         <h2>Vocabulary</h2>
//         {/* הצגת המילים שהתקבלו */}
//         <ol>
//             {words.length > 0 ? (
//                 words.map((word, index) => (
//                     <li key={index}>{word.name}- {word.translation}</li> // נניח של-Word יש תכונה text
//                 )))
//                 : (<p>No words found.</p>)
//             }
//         </ol>
//     </>)
// }
// export default Details;

