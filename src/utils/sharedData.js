let cardiomyopathyTypes = [
    "Hypertrophic cardiomyopathy(HCM)",
    "Dilated cardiomyopathy(DCM)",
    "Restrictive cardiomyopathy(RCM)",
    "Left Ventricular Non - compaction(LVNC)",
    "Arrhythmogenic Right Ventricular Dysplasia(ARVD)"
]

let mutatedGenes = [
    "TNNT",
    "MYH",
    "TPM1",
    "MYBPC3"
]

let apiIdGeneMap = {
    "TPM1": "115196",
    "MYBPC3": "115197",
    "MYH": "192600",
    "TNNT": "115195"
}

let chartDataTypes = [
    "Sarcomere Length vs Time",
    "Force vs Calcium concentration",
    "Tension vs Calcium concentration",
    "Sarcomere Shortening vs Time",
    "Velocity vs Calcium concentration",
    "Sliding velocity vs Calcium concentration"
]

export { cardiomyopathyTypes, mutatedGenes, chartDataTypes, apiIdGeneMap };
