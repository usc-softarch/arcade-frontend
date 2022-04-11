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
import TextField from '@mui/material/TextField';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const steps = ['Upload Files', 'Choose Settings to Run', 'Results'];

export default function FactExtraction() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
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

    return (
        <div>
            <ArcadeBar/>
        <Box m={2}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h5" component="div">
                                <Box component="span" fontWeight='fontWeightMedium'>Fact Extraction</Box>
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, mx: "auto", width: '60%', textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>
                    <Typography variant="body1" gutterBottom>
                        This tool extracts information needed to run the architectural recovery.
                    </Typography>
            </Box>
            <Stepper activeStep={activeStep}>
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
                    <Typography variant="overline" display="block" gutterBottom>Input File Directory</Typography>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Directory
                        <input
                            directory="" webkitdirectory=""
                            type="file"
                            hidden
                        />
                    </Button>
                    <div> <br /> </div>
                    <Typography variant="overline" display="block" gutterBottom>Dependencies RSF files</Typography>
                        <UploadFiles />
                    <div> <br /> </div>
                    <Typography variant="overline" display="block" gutterBottom>Language</Typography>
                    <input type="radio" name="languageSelection" value="Java" /> Java
                    <input type="radio" name="languageSelection" value="C++" /> C++
                    <div> <br /> </div>
                    <Typography variant="overline" display="block" gutterBottom>Package Prefix (Optional)</Typography>
                    <TextField id="standard-basic" variant="standard" />
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