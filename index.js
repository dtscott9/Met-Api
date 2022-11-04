const url1 =
  "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const url2 = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

async function fetchData(url) {
  const res = await fetch(url);
  return await res.json();
}

async function fillSelectElement(url) {
  const metData = await fetchData(url);
  metData.departments.forEach((element) => {
    console.log(element);
    let departmentName = document.createElement("option");
    departmentName.setAttribute("value", element.displayName);
    departmentName.textContent = element.displayName;
    document.querySelector("#department").append(departmentName);
  });
}

fillSelectElement(url1);

async function displayArt() {
  //let department = document.querySelector("option").value;

  const objectData = await fetchData(url2);

  for (let i = 0; i < 10; i++) {
    let objectIndex = objectData.objectIDs[i];
    const newUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIndex}`;
    let object = await fetchData(newUrl);
    console.log(object.objectName);
    document
      .querySelector(".art")
      .append(
        document
          .createElement("img")
          .setAttribute("src", object.primaryImageSmall)
      );
  }
}

displayArt();
