$(document).ready(function () {
    let currentPage = 1;
    const itemsPerPage = 5;  
    let countriesData = [];


    $.ajax({
        url: 'https://restcountries.com/v3.1/all', 
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            countriesData = data;
            displayData();
        },
        error: function (error) {
            console.error('Error fetching data', error);
        }
    });


    function displayData() {
        let tableBody = $('#countries-table tbody');
        tableBody.empty(); 
        
        
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        let dataToDisplay = countriesData.slice(startIndex, endIndex);

        
        dataToDisplay.forEach(function (country) {
            let row = $('<tr>');
            row.append(`<td>${country.name.common}</td>`);
            row.append(`<td>${country.capital ? country.capital[0] : 'N/A'}</td>`);
            row.append(`<td>${country.population ? country.population : 'N/A'}</td>`);
            row.append(`<td>${country.area ? country.area : 'N/A'}</td>`);
            tableBody.append(row);
        });

        
        $('#page-number').text(`Page ${currentPage}`);


        $('#prev').toggle(currentPage > 1);
        $('#next').toggle(currentPage < Math.ceil(countriesData.length / itemsPerPage));
    }


    $('#search').on('keyup', function () {
        let query = $(this).val().toLowerCase();
        countriesData = countriesData.filter(country => 
            country.name.common.toLowerCase().includes(query)
        );
        currentPage = 1;
        displayData();
    });


    $('#prev').on('click', function () {
        if (currentPage > 1) {
            currentPage--;
            displayData();
        }
    });

    $('#next').on('click', function () {
        if (currentPage < Math.ceil(countriesData.length / itemsPerPage)) {
            currentPage++;
            displayData();
        }
    });


    $('.sortable').on('click', function () {
        let sortBy = $(this).data('sort');
        countriesData.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });
        displayData();
    });
});
