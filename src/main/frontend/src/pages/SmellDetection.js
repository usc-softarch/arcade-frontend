import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArcadeBar from "../ArcadeBar";
import UploadFiles from "../components/upload-files.component";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const steps = ['Upload Files', 'Choose Settings to Run', 'Results'];

export default function SmellDetection() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const [archSmellDetector, setArchSmellDetector] = React.useState(false);
    const [dependencyFinderProcessing, setDependencyFinderProcessing] = React.useState(false);
    const [dependencyRSFFiles, setDependencyRSFFiles] = React.useState('');
    const [clusterRSFFiles, setClusterRSFFiles] = React.useState('');
    const [language, setLanguage] = React.useState('');

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const isStepOptional = (step) => {
        return step === 1;
    };

    const clearSmellDetectors = () => {
        let sd1 = document.getElementById("smellDetector1");
        let sd2 = document.getElementById("smellDetector2");
        if (sd1.checked) sd1.checked = false;
        if (sd2.checked) sd2.checked = false;
        setArchSmellDetector(false);
        setDependencyFinderProcessing(false);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleDependencyCallback = (childData) => {
        setDependencyRSFFiles(childData);
    }

    const handleClusterCallback = (childData) => {
        setClusterRSFFiles(childData);
    }

    return (
        <div>
            <ArcadeBar/>
        <Box m={2} sx={{ flexGrow: 1, mx: "auto", width: '75%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h5" component="div">
                                <Box component="span" fontWeight='fontWeightMedium'>Smell Detection</Box>
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, mx: "auto", width: '66%', textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>
                    <Typography variant="body1" gutterBottom>
                        Architectural smells are instances of potentially problematic design decisions that, over time, cause architectural decay. ARCADE’s decay detectors are applied on the outputs of the recovery tools to identify those instances. Decay detectors currently available through ARCADE are capable of identifying 11 different architectural smells, grouped in four categories: interface-based, change-based, concern-based, and dependency-based.
                    </Typography>
            </Box>
            <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Success! The generated files are available here for download.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography variant="overline" display="block" gutterBottom>Select Smell Detector(s):</Typography>
                    <p style={{margin: '0px 0px 15px 15px', color: 'gray'}}>
                        - ArchSmellDetector detects concern-based and dependency-based smells<br/>
                        - DependencyFinderProcessing detects interface-based and coupling-based smells
                    </p>
                    <input onClick={() => {setArchSmellDetector(true)}} type="radio" id="smellDetector1" value="ArchSmellDetector" /> ArchSmellDetector
                    &nbsp;
                    <input onClick={() => {setDependencyFinderProcessing(true)}} type="radio" id="smellDetector2" value="DependencyFinderProcessing" /> DependencyFinderProcessing
                    <div/>
                    <Button onClick={clearSmellDetectors} sx={{ mb: 1 }}>
                        Clear
                    </Button>
                    <Typography variant="overline" display="block" gutterBottom>Directory Containing Dependency RSF Files</Typography>
                    <p style={{margin: '0px 0px 15px 15px', color: 'gray'}}>ZIP file of the directory containing dependency RSF files</p>
                        <UploadFiles parentCallback = {handleDependencyCallback} />
                    <div> <br /> </div>
                    <Typography variant="overline" display="block" gutterBottom>Directory Containing Clustered RSF Files</Typography>
                    <p style={{margin: '0px 0px 15px 15px', color: 'gray'}}>ZIP file of the directory containing clustered RSF files</p>
                        <UploadFiles parentCallback = {handleClusterCallback} />
                    <div> <br /> </div>
                    <Typography variant="overline" display="block" gutterBottom>Language</Typography>
                    <input onClick={() => {setLanguage("Java")}} type="radio" name="languageSelection" value="Java" /> Java
                    <input onClick={() => {setLanguage("C/C++")}} type="radio" name="languageSelection" value="C/C++" /> C/C++
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
        </div>
    );
}