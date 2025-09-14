// Updated script.js to use real API endpoints
async function timestampAPI(dateString) {
    try {
        let url;
        
        // Determine the API endpoint
        if (!dateString || dateString.trim() === '') {
            url = '/api/';
        } else {
            url = `/api/${encodeURIComponent(dateString.trim())}`;
        }

        // Make the API request
        const response = await fetch(url);
        const result = await response.json();
        
        return result;
    } catch (error) {
        return { error: "Invalid Date" };
    }
}

async function testAPI(predefinedValue) {
    const input = predefinedValue !== undefined ? predefinedValue : document.getElementById('dateInput').value;
    
    // Show loading state
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';
    resultDiv.className = 'result';
    
    const result = await timestampAPI(input);
    displayResult(result);
}

async function getCurrentTime() {
    // Show loading state
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';
    resultDiv.className = 'result';
    
    const result = await timestampAPI('');
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