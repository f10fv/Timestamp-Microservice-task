// API endpoint simulation
function timestampAPI(dateString) {
    try {
        let date;
        
        // If no date string provided, return current time
        if (!dateString || dateString.trim() === '') {
            date = new Date();
        } else {
            // Check if it's a Unix timestamp (all digits)
            if (/^\d+$/.test(dateString.trim())) {
                const timestamp = parseInt(dateString.trim());
                date = new Date(timestamp);
            } else {
                // Try to parse as date string
                date = new Date(dateString.trim());
            }
        }

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return { error: "Invalid Date" };
        }

        return {
            unix: date.getTime(),
            utc: date.toUTCString()
        };
    } catch (error) {
        return { error: "Invalid Date" };
    }
}

function testAPI(predefinedValue) {
    const input = predefinedValue !== undefined ? predefinedValue : document.getElementById('dateInput').value;
    const result = timestampAPI(input);
    displayResult(result);
}

function getCurrentTime() {
    const result = timestampAPI('');
    displayResult(result);
    document.getElementById('dateInput').value = '';
}

function clearResult() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').className = 'result';
    document.getElementById('dateInput').value = '';
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    
    if (result.error) {
        resultDiv.innerHTML = JSON.stringify(result, null, 2);
        resultDiv.className = 'result error';
    } else {
        resultDiv.innerHTML = JSON.stringify(result, null, 2);
        resultDiv.className = 'result success';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to trigger test
    document.getElementById('dateInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            testAPI();
        }
    });

    // Auto-focus input on page load
    document.getElementById('dateInput').focus();

    // Add click handlers for example URLs
    const exampleUrls = document.querySelectorAll('.example-url');
    exampleUrls.forEach(url => {
        url.style.cursor = 'pointer';
        url.title = 'Click to test this example';
    });
});