document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    var input = document.getElementById('input');
    var result = document.getElementById('result');
    var inputType = document.getElementById('inputType');
    var resultType = document.getElementById('resultType');
    var converterTitle = document.getElementById('converter-title');
    var converterType = document.getElementById('converterType');

    // Conversion options
    var lengthOptions = [
        'Kilometre', 'Metre', 'Centimetre', 'Millimetre', 'Micrometre',
        'Nanometre', 'Mile', 'Yard', 'Foot', 'Inch', 'Nautical Mile'
    ];

    var massOptions = [
        'Ton', 'Kilogram', 'Gram', 'Milligram', 'Microgram', 'Nanogram'
    ];

    var temperatureOptions = [
        'Celsius', 'Fahrenheit', 'Kelvin'
    ];

    // Event listener for converter type change
    converterType.addEventListener('change', function() {
        var selectedType = converterType.value;

        // Update converter title and options
        switch (selectedType) {
            case 'length':
                converterTitle.textContent = 'Length Converter';
                updateOptions(lengthOptions);
                break;
            case 'mass':
                converterTitle.textContent = 'Mass Converter';
                updateOptions(massOptions);
                break;
            case 'temperature':
                converterTitle.textContent = 'Temperature Converter';
                updateOptions(temperatureOptions);
                break;
            default:
                converterTitle.textContent = 'Converter';
                break;
        }
    });

    // Function to update options in inputType and resultType select elements
    function updateOptions(optionsArray) {
        // Clear existing options
        inputType.innerHTML = '';
        resultType.innerHTML = '';

        // Add new options
        optionsArray.forEach(function(option) {
            var optionElem = document.createElement('option');
            optionElem.value = option;
            optionElem.textContent = option;
            inputType.appendChild(optionElem);

            var resultOptionElem = document.createElement('option');
            resultOptionElem.value = option;
            resultOptionElem.textContent = option;
            resultType.appendChild(resultOptionElem);
        });

        // Set initial selected values
        inputType.value = optionsArray[0];
        resultType.value = optionsArray[0];

        // Trigger the conversion calculation
        myResult();
    }

    // Event listeners for input and select elements
    input.addEventListener('input', myResult);
    inputType.addEventListener('change', myResult);
    resultType.addEventListener('change', myResult);

    // Function to perform conversion calculation
    function myResult() {
        var inputValue = parseFloat(input.value);
        var inputTypeValue = inputType.value;
        var resultTypeValue = resultType.value;

        if (!isNaN(inputValue)) {
            // Check inputTypeValue and call appropriate conversion function
            switch (inputTypeValue) {
                case 'Metre':
                    convertLength(resultTypeValue, inputValue);
                    break;
                case 'Kilometre':
                    convertLength(resultTypeValue, inputValue * 1000);
                    break;
                case 'Centimetre':
                    convertLength(resultTypeValue, inputValue / 100);
                    break;
                case 'Millimetre':
                    convertLength(resultTypeValue, inputValue / 1000);
                    break;
                case 'Micrometre':
                    convertLength(resultTypeValue, inputValue / 1e6);
                    break;
                case 'Nanometre':
                    convertLength(resultTypeValue, inputValue / 1e9);
                    break;
                case 'Mile':
                    convertLength(resultTypeValue, inputValue / 0.000621371);
                    break;
                case 'Yard':
                    convertLength(resultTypeValue, inputValue / 1.09361);
                    break;
                case 'Foot':
                    convertLength(resultTypeValue, inputValue / 3.28084);
                    break;
                case 'Inch':
                    convertLength(resultTypeValue, inputValue / 39.3701);
                    break;
                case 'Nautical Mile':
                    convertLength(resultTypeValue, inputValue / 0.000539957);
                    break;
                case 'Gram':
                    convertMass(resultTypeValue, inputValue);
                    break;
                case 'Kilogram':
                    convertMass(resultTypeValue, inputValue * 1000);
                    break;
                case 'Milligram':
                    convertMass(resultTypeValue, inputValue / 1000);
                    break;
                case 'Microgram':
                    convertMass(resultTypeValue, inputValue / 1e6);
                    break;
                case 'Ton':
                    convertMass(resultTypeValue, inputValue * 1000000);
                    break;
                case 'Nanogram':
                    convertMass(resultTypeValue, inputValue / 1e9);
                    break;
                case 'Celsius':
                    convertTemperature(resultTypeValue, inputValue);
                    break;
                case 'Fahrenheit':
                    convertTemperature(resultTypeValue, (inputValue - 32) / 1.8);
                    break;
                case 'Kelvin':
                    convertTemperature(resultTypeValue, inputValue - 273.15);
                    break;
                default:
                    result.value = ''; // Clear result if inputTypeValue is not recognized
            }
        } else {
            result.value = ''; // Clear result if input is not a number
        }
    }

    // Conversion functions for different types
    function convertLength(toUnit, value) {
        switch (toUnit) {
            case 'Metre':
                result.value = value;
                break;
            case 'Kilometre':
                result.value = value / 1000;
                break;
            case 'Centimetre':
                result.value = value * 100;
                break;
            case 'Millimetre':
                result.value = value * 1000;
                break;
            case 'Micrometre':
                result.value = value * 1e6;
                break;
            case 'Nanometre':
                result.value = value * 1e9;
                break;
            case 'Mile':
                result.value = value * 0.000621371;
                break;
            case 'Yard':
                result.value = value * 1.09361;
                break;
            case 'Foot':
                result.value = value * 3.28084;
                break;
            case 'Inch':
                result.value = value * 39.3701;
                break;
            case 'Nautical Mile':
                result.value = value * 0.000539957;
                break;
            default:
                result.value = value; // if resultType === inputType
        }
    }

    function convertMass(toUnit, value) {
        switch (toUnit) {
            case 'Gram':
                result.value = value;
                break;
            case 'Kilogram':
                result.value = value / 1000;
                break;
            case 'Milligram':
                result.value = value * 1000;
                break;
            case 'Microgram':
                result.value = value * 1e6;
                break;
            case 'Ton':
                result.value = value / 1000000;
                break;
            case 'Nanogram':
                result.value = value * 1e9;
                break;
            default:
                result.value = value; // if resultType === inputType
        }
    }

    function convertTemperature(toUnit, value) {
        switch (toUnit) {
            case 'Celsius':
                result.value = value;
                break;
            case 'Fahrenheit':
                result.value = (value * 1.8) + 32;
                break;
            case 'Kelvin':
                result.value = value + 273.15;
                break;
            default:
                result.value = value; // if resultType === inputType
        }
    }
});
