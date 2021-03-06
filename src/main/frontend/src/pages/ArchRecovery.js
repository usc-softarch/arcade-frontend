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

export default function ArchRecovery() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const [recoveryTechnique, setRecoveryTechnique] = React.useState('');
    const [inputFileDirectory, setInputFileDirectory] = React.useState('');
    const [inputDirectory, setInputDirectory] = React.useState('');
    const [factExtractorFiles, setFactExtractorFiles] = React.useState('');

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

    const handleDirectoryCallback = (childData) => {
        setInputDirectory(childData);
    }

    const handleFactCallback = (childData) => {
        setFactExtractorFiles(childData);
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
                                <Box component="span" fontWeight='fontWeightMedium'>Arch Recovery</Box>
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, mx: "auto", width: '66%', textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>
                    <Typography variant="body1" gutterBottom>
                        Recovery constructs architectural models from implementation level artifacts. The recovery tools integrated within ARCADE implement different strategies for clustering implementation-level entities into architectural elements, including dependency analysis, information retrieval, search-based strategies, machine learning, etc.
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
                    <Typography variant="overline" display="block" gutterBottom>Recovery Technique</Typography>
                    <p style={{margin: '0px 0px 15px 15px', color: 'gray'}}>
                        - Algorithm for Comprehension-Driven Clustering (ACDC) uses human-comprehensible patterns commonly encountered in software systems to group source code entities into components<br/>
                        - Architecture Recovery using Concerns (ARC) uses the words in the source code of a system to detect the concerns the system addresses. It then uses those concerns to group code entities into clusters that represent components
                    </p>
                    <input onClick={() => {setRecoveryTechnique("ACDC")}}  type="radio" name="recoveryTechniqueSelection" value="ACDC" /> ACDC
                    &nbsp;
                    <input onClick={() => {setRecoveryTechnique("ARC")}} type="radio" name="recoveryTechniqueSelection" value="ARC" /> ARC
                    <div> <br /> </div>
                    <Typography variant="overline" display="block" gutterBottom>Input File Directory</Typography>
                    <p style={{margin: '0px 0px 15px 15px', color: 'gray'}}>ZIP file of directory containing one or more subdirectories with different versions of the subject system</p>
                    <UploadFiles parentCallback = {handleDirectoryCallback} />
                    <div> <br /> </div>
                    <Typography variant="overline" display="block" gutterBottom>Fact Extractor Files (optional)</Typography>
                    <p style={{margin: '0px 0px 15px 15px', color: 'gray'}}>Output files from the Fact Extraction macrophase for the subject system</p>
                        <UploadFiles parentCallback = {handleFactCallback} />
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