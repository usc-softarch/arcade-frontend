import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

export default function Metrics() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const [metrics, setMetrics] = React.useState('');
    const [clusteredRSFFiles, setClusteredRSFFiles] = React.useState('');
    const [dependencyRSFFiles, setDependencyRSFFiles] = React.useState('');

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const isStepOptional = (step) => {
        return step === 1;
    };

    const clearMetricSelections = () => {
        let m1 = document.getElementById("metric1");
        let m2 = document.getElementById("metric2");
        if (m1.checked) m1.checked = false;
        if (m2.checked) m2.checked = false;
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

    const handleClusterCallback = (childData) => {
        setClusteredRSFFiles(childData);
    }

    const handleDependencyCallback = (childData) => {
        setDependencyRSFFiles(childData);
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
                                <Box component="span" fontWeight='fontWeightMedium'>Metrics</Box>
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, mx: "auto", width: '66%', textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>
                    <Typography variant="body1" gutterBottom>
                        ARCADE incorporates various metrics for quantifying architectural change and decay. These metrics focus either on the whole system or on individual components (i.e., the recovered clusters of code-level entities).
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
                    <Typography variant="overline" display="block" gutterBottom>Select metric(s):</Typography>
                    <p style={{margin: '0px 0px 15px 15px', color: 'gray'}}>
                        - Architecture-to-architecture (A2A) is a system-level similarity metric based on the cost of transforming one architecture to another<br/>
                        - Metrics for analyzing the decay of software architectures over time, allowing for improved understanding of the relationship between architectural change and decay on the one hand, and the reported implementation issues faced by architects and developers on the other
                    </p>
                    <input onClick={() => {setMetrics("A2A")}} type="radio" id="metric1" value="A2A" /> A2A
                    &nbsp;
                    <input onClick={() => {setMetrics("Decay Metrics")}} type="radio" id="metric2" value="Decay Metrics" /> Decay Metrics
                    <div/>
                    <Button onClick={clearMetricSelections} sx={{ mb: 1 }}>
                        Clear
                    </Button>
                    <Typography variant="overline" display="block" gutterBottom>Directory Containing clustered RSF files:</Typography>
                    <p style={{margin: '0px 0px 15px 15px', color: 'gray'}}>ZIP file of the directory containing clustered RSF files</p>
                        <UploadFiles parentCallback = {handleClusterCallback} />
                    <div> <br /> </div>
                    <Typography variant="overline" display="block" gutterBottom>Directory containing dependency RSF files:</Typography>
                    <p style={{margin: '0px 0px 15px 15px', color: 'gray'}}>ZIP file of the directory containing dependency RSF files</p>
                        <UploadFiles parentCallback = {handleDependencyCallback} />
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