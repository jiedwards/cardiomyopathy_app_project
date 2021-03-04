function GenerateCharts(ExperimentalData) {
    let experimentalDataCharts = [];

    ExperimentalData.forEach((docData) => {
        let chart = {
            chartOptions: {
                chart: {
                    type: "line",
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [5, 7, 5],
                    curve: "straight",
                    dashArray: [0, 8, 5],
                },
                title: {
                    text: docData.chart_title,
                    align: "left",
                },
                grid: {
                    row: {
                        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                        opacity: 0.5,
                    },
                },
                xaxis: {
                    categories: docData.x_axis_data,
                    tickAmount: docData.x_axis_tick_amount - 1,
                    title: {
                        text: docData.x_axis_label,
                    },
                },
                yaxis: {
                    title: {
                        text: docData.y_axis_label,
                    },
                },
                legend: {
                    position: "top",
                    horizontalAlign: "right",
                    floating: true,
                    offsetY: -25,
                    offsetX: -5,
                },
            },
            series: GetYAxisData(docData),
        };

        experimentalDataCharts.push({ docData, chart });
    });

    return experimentalDataCharts;
}

function GetYAxisData(docData) {
    let resultData = [];
    // Iterate through Y data axis array in firebase and extract data for each line
    for (let y_axis_data_array of docData.y_axis_data) {
        resultData.push({
            name: y_axis_data_array.plot_name,
            data: y_axis_data_array.data,
        });
    }
    return resultData;
}

async function ApiGeneDataRequest(api_disease_id) {
    const apiUrl = `https://hpo.jax.org/api/hpo/disease/OMIM:${api_disease_id}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    return data;
}

export { GenerateCharts, ApiGeneDataRequest }