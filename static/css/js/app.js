function ReloadPage(){
    window.location.reload();
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".dot-wave").style.display = "none";
});
let currentIndex = 0;
const images = document.querySelectorAll('.image-container img');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');  
const imageGallery = document.querySelector('.image-gallery');
function showImage(index) {
    images.forEach((image, i) => {
        if (i === index) {
            image.style.display = 'block';
        } else {
            image.style.display = 'none';
        }
    });
}
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}
function startAutoChange() {
    setInterval(nextImage, 5000);
}
showImage(currentIndex);
startAutoChange();
imageGallery.addEventListener('mouseenter', () => {
    prevButton.style.opacity = 1;
    nextButton.style.opacity = 1;
});
imageGallery.addEventListener('mouseleave', () => {
    prevButton.style.opacity = 0;
    nextButton.style.opacity = 0;
});
let isMenuOpen = false;
function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    if (!isMenuOpen) {
        navList.style.display = 'block';
        isMenuOpen = true;
    } else {
        navList.style.display = 'none';
        isMenuOpen = false;
    }
}
const departments = document.querySelectorAll('.department-box');
const boxContents = document.querySelectorAll('.box-content');
departments.forEach((department, i) => {
    department.addEventListener('mouseenter', () => {
        boxContents[i].style.display = 'block';
    });
    department.addEventListener('mouseleave', () => {
        boxContents[i].style.display = 'none';
    });
});

document.getElementById('centrifuge').addEventListener('click', () => {
    window.location.href = "centrifuge";
});

document.getElementById('ventilator').addEventListener('click', () => {
    window.location.href = "ventilator";
});

document.getElementById('woodslamp').addEventListener('click', () => {
    window.location.href = "woodslamp";
});

document.getElementById('patientmonitor').addEventListener('click', () => {
    window.location.href = "patientmonitor";
});

document.getElementById('anesthesia').addEventListener('click', () => {
    window.location.href = "anesthesia";
});

function openHistoryWindow(Serial) {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            globalData = data;
            let tempData;
            for(var i = 0; i < globalData.length; i++){
                if (globalData[i]["Serial"] == Serial)
                    tempData = globalData[i];
            }
            document.getElementById("history-window").style.display = "block";
            const diatbl = document.getElementById("dialogTable");
            diatbl.innerHTML = `<table>
                                    <tr>
                                        <th>PM Done</th>
                                        <th>PM Due</th>
                                        <th>Under</th>
                                        <th>Remarks</th>
                                    </tr>
                                    <tr>
                                        <td>${tempData["Serial"]}</td>
                                        <td>${tempData["PM-Due"]}</td>
                                        <td>${tempData["Under"]}</td>
                                        <td>${tempData["Remarks"]}</td>
                                    </tr>
                                </table>`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
    });
}
function closeHistoryWindow() {
    document.getElementById("history-window").style.display = "none";
}
function clearText(){
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            globalData = data;
            document.getElementById("inputText").value = "";
            document.getElementById("clear").style.visibility = "hidden";
            var table = document.getElementById("equipmentTable");
            var content = "<tr><th>S.No</th><th>Equipment Name</th><th>Department</th><th>Model</th><th>Serial No</th><th>Company</th><th>Asset No</th><th>More</th></tr>";
            for(var i = 0; i < globalData.length; i++){
                content += `<tr>
                        <td>${ i+1 }</td>
                        <td>${ globalData[i]["Equipment_name"] }</td>
                        <td>${ globalData[i]["Department"] }</td>
                        <td>${ globalData[i]["Model"] }</td>
                        <td>${ globalData[i]["Serial"] }</td>
                        <td>${ globalData[i]["Company"] }</td>
                        <td>${ globalData[i]["AssetNo"] }</td>
                        <td><button onclick="openHistoryWindow('${ globalData[i]['Serial'] }')">&rarr;</button></td>
                    </tr>`;
            }
            table.innerHTML = content;
        });
}
function search() {
    var input = document.getElementById("inputText").value;
    if (input != ""){
        document.getElementById("clear").style.visibility = "visible";
        fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            globalData = data;
            let searchData = [];
            for(let i = 0; i < globalData.length ; i++){
                if(globalData[i]["Department"].toLowerCase() == input.toLowerCase() || globalData[i]["AssetNo"].toLowerCase() == input.toLowerCase() || globalData[i]["Serial"].toLowerCase() == input.toLowerCase() || globalData[i]["Model"].toLowerCase() == input.toLowerCase() || globalData[i]["Company"].toLowerCase() == input.toLowerCase()){
                    searchData.push(globalData[i]);
                }
            }
            var table = document.getElementById("equipmentTable");
            if(searchData.length === 0){
                table.innerHTML = "<th>Data Not Found</th>";
            }
            else{
                var content = "<tr><th>S.No</th><th>Equipment Name</th><th>Department</th><th>Model</th><th>Serial No</th><th>Company</th><th>Asset No</th><th>More</th></tr>";
                for(var i = 0; i < searchData.length; i++){
                    content += `<tr>
                                    <td>${ i+1 }</td>
                                    <td>${ searchData[i]["Equipment_name"] }</td>
                                    <td>${ searchData[i]["Department"] }</td>
                                    <td>${ searchData[i]["Model"] }</td>
                                    <td>${ searchData[i]["Serial"] }</td>
                                    <td>${ searchData[i]["Company"] }</td>
                                    <td>${ searchData[i]["AssetNo"] }</td>
                                    <td><button onclick="openHistoryWindow('${ searchData[i]['Serial'] }')">&rarr;</button></td>
                                </tr>`;
                }
                table.innerHTML = content;
            }
        });
    }
}

