// --- Lógica de Pestañas ---
function openTab(evt, tabName) {
	let i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tab-content");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
		tabcontent[i].classList.remove("active");
	}
	tablinks = document.getElementsByClassName("tab-button");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].classList.remove("active");
	}
	const currentTab = document.getElementById(tabName);
	if (currentTab) {
		currentTab.style.display = "block";
		currentTab.classList.add("active");
	}
	if (evt && evt.currentTarget) {
		evt.currentTarget.classList.add("active");
	}
}

// --- Dark Mode ---
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

function setDarkMode(isDark) {
	if (isDark) {
		body.classList.add('dark-mode');
		if (darkModeToggle) darkModeToggle.textContent = 'Modo Claro';
		localStorage.setItem('darkMode', 'enabled');
	} else {
		body.classList.remove('dark-mode');
		if (darkModeToggle) darkModeToggle.textContent = 'Modo Oscuro';
		localStorage.setItem('darkMode', 'disabled');
	}
}

if (darkModeToggle) {
	darkModeToggle.addEventListener('click', () => {
		setDarkMode(!body.classList.contains('dark-mode'));
	});
}

if (localStorage.getItem('darkMode') === 'enabled') {
	setDarkMode(true);
}


document.addEventListener('DOMContentLoaded', () => {
	const firstTabButton = document.getElementById('tab-btn-vectores-df');
	if (firstTabButton) {
		firstTabButton.click();
	} else {
		const anyTabButton = document.querySelector('.tab-button');
		if (anyTabButton) anyTabButton.click();
	}

	if (document.getElementById('matrix-table')) initializeMatrix();
	if (document.getElementById('array-stack-visual')) initializeArray(); // Initialize with empty or default state
	if (document.getElementById('factor-character-comparison')) initializeFactorCharDemo();
	if (document.getElementById('vectores-intro')) initializeVectorDemos();
	if (document.getElementById('dataframes-intro')) initializeDynamicDataFrameDemo();
});

function toggleDetails(elementId) {
	const detailsDiv = document.getElementById(elementId);
	if (detailsDiv) {
		detailsDiv.classList.toggle('show');
	}
}

function disableCreateButtons(disabled = true) {
	const matrixBtn = document.getElementById('btn-create-matrix');
	const arrayBtn = document.getElementById('btn-create-array');
	if (matrixBtn) matrixBtn.disabled = disabled;
	if (arrayBtn) arrayBtn.disabled = disabled;
}

const matrixData = [[1, 4], [2, 5], [3, 6]];
function initializeMatrix(clearOnly = false) {
	const matrixTableBodyEl = document.getElementById('matrix-table');
	if (!matrixTableBodyEl) return;
	const matrixTableBody = matrixTableBodyEl.getElementsByTagName('tbody')[0];
	matrixTableBody.innerHTML = '';
	if (clearOnly) return;
	matrixData.forEach(rowData => {
		const row = matrixTableBody.insertRow();
		rowData.forEach(cellData => {
			const cell = row.insertCell();
			cell.textContent = cellData;
			cell.classList.add('cell-homogeneous');
		});
	});
}
async function createMatrixAnimation() {
	disableCreateButtons();
	initializeMatrix(true);
	const matrixTableBodyEl = document.getElementById('matrix-table');
	if (!matrixTableBodyEl) { disableCreateButtons(false); return; }
	const matrixTableBody = matrixTableBodyEl.getElementsByTagName('tbody')[0];
	const statusDiv = document.getElementById('matrix-status');
	if (statusDiv) statusDiv.textContent = "Construyendo estructura de la matriz...";

	for (let i = 0; i < matrixData.length; i++) {
		const row = matrixTableBody.insertRow();
		for (let j = 0; j < matrixData[0].length; j++) {
			const cell = row.insertCell();
			cell.classList.add('cell-homogeneous');
			await new Promise(resolve => setTimeout(resolve, 50));
		}
	}
	await new Promise(resolve => setTimeout(resolve, 300));
	if (statusDiv) statusDiv.textContent = "Llenando con datos homogéneos (numéricos)...";

	let cellFillDelay = 0;
	for (let i = 0; i < matrixData.length; i++) {
		for (let j = 0; j < matrixData[i].length; j++) {
			const cell = matrixTableBody.rows[i].cells[j];
			cell.textContent = matrixData[i][j];
			cell.classList.add('cell-animated-aparicion');
			setTimeout(() => {
				cell.style.opacity = '1';
				cell.style.transform = 'scale(1) rotate(0deg)';
				cell.classList.add('cell-highlight-temp');
				setTimeout(() => cell.classList.remove('cell-highlight-temp'), 400);
			}, cellFillDelay);
			cellFillDelay += 150;
		}
	}
	await new Promise(resolve => setTimeout(resolve, cellFillDelay + 300));
	if (statusDiv) statusDiv.textContent = "¡Matriz creada!";
	disableCreateButtons(false);
}

const arrayLayersData = [[[1, 3], [2, 4]], [[5, 7], [6, 8]]];

// Helper function to create and animate a single layer table
async function createAndAnimateLayerTable(layerData, parentElement, initialTransform = '', finalTransform = '', delayStart = 0) {
	const layerDiv = document.createElement('div');
	layerDiv.classList.add('array-layer-3d');

	const table = document.createElement('table');
	table.classList.add('table-like', 'm-0');
	const tbody = table.createTBody();

	// Draw skeleton
	for (let i = 0; i < layerData.length; i++) {
		const r = tbody.insertRow();
		for (let j = 0; j < layerData[0].length; j++) r.insertCell().classList.add('cell-homogeneous');
	}
	layerDiv.appendChild(table);
	parentElement.appendChild(layerDiv);

	layerDiv.style.transform = initialTransform;
	layerDiv.style.opacity = '0';

	await new Promise(resolve => setTimeout(resolve, delayStart));

	layerDiv.style.opacity = '1';
	layerDiv.style.transform = finalTransform;

	await new Promise(resolve => setTimeout(resolve, 600)); // Wait for layer to appear/move

	let cellFillDelay = 0;
	for (let i = 0; i < layerData.length; i++) {
		for (let j = 0; j < layerData[i].length; j++) {
			const cell = tbody.rows[i].cells[j];
			cell.textContent = layerData[i][j];
			cell.classList.add('cell-animated-aparicion');
			setTimeout(() => {
				cell.style.opacity = '1';
				cell.style.transform = 'scale(1) rotate(0deg)';
			}, cellFillDelay);
			cellFillDelay += 100;
		}
	}
	await new Promise(resolve => setTimeout(resolve, cellFillDelay + 100));
	return layerDiv; // Return the created layer element
}


function initializeArray(clearOnly = false) {
	const stackContainer = document.getElementById('array-stack-visual');
	if (!stackContainer) return;
	stackContainer.innerHTML = '';
	if (clearOnly) {
		stackContainer.style.transform = 'rotateX(0deg) rotateY(0deg) translateX(0px)'; // Reset view
		return;
	}
	// Default initial view (can be empty or show a placeholder)
	stackContainer.style.transform = 'rotateX(25deg) rotateY(-20deg) translateX(0px)';
}

async function createArrayAnimation() {
	disableCreateButtons();
	initializeArray(true); // Clear previous and reset transform
	const stackContainer = document.getElementById('array-stack-visual');
	if (!stackContainer) { disableCreateButtons(false); return; }
	const statusDiv = document.getElementById('array-status');

	// --- Fase 1: Crear Capa 1 (a la izquierda) ---
	if (statusDiv) statusDiv.textContent = "Construyendo Capa 1 del Array...";
	stackContainer.style.transform = 'translateX(-60px)'; // Move stack for layer 1
	const layer1Div = await createAndAnimateLayerTable(arrayLayersData[0], stackContainer, 'translateZ(-30px) translateY(15px) rotateX(-15deg) rotateY(10deg)', 'translateZ(0px) translateY(0px) rotateX(0deg) rotateY(0deg)', 200);
	layer1Div.style.position = 'relative'; // So it doesn't overlap with next one initially

	await new Promise(resolve => setTimeout(resolve, 300));

	// --- Fase 2: Crear Capa 2 (a la derecha de Capa 1) ---
	if (statusDiv) statusDiv.textContent = "Construyendo Capa 2 del Array...";
	// We need a temporary container or adjust positioning for the second layer if stackContainer is used for 3D perspective
	// For simplicity, let's create it and then move it.
	// Or, create it with an offset, then animate to its final stacked position.

	// Create layer 2 slightly offset and then animate it into stacking position
	const layer2InitialXOffset = 120; // Pixels to the right for initial display
	const layer2InitialZOffset = -30;
	const layer2InitialYOffset = 15;

	const layer2Div = await createAndAnimateLayerTable(
		arrayLayersData[1],
		stackContainer,
		`translateX(${layer2InitialXOffset}px) translateZ(${layer2InitialZOffset}px) translateY(${layer2InitialYOffset}px) rotateX(-15deg) rotateY(-10deg)`,
		`translateX(${layer2InitialXOffset}px) translateZ(0px) translateY(0px) rotateX(0deg) rotateY(0deg)`, // Animate to flat beside layer 1
		100
	);
	layer2Div.style.position = 'relative'; // Keep it relative for now

	await new Promise(resolve => setTimeout(resolve, 500));

	// --- Fase 3: Apilar Capas y Transicionar a 3D ---
	if (statusDiv) statusDiv.textContent = "Apilando capas para formar el Array 3D...";

	// Reset stack container transform for the final 3D view
	stackContainer.style.transform = 'rotateX(25deg) rotateY(-20deg) translateX(0px)';

	// Make layers absolute for stacking
	layer1Div.style.position = 'absolute';
	layer2Div.style.position = 'absolute';

	// Animate Layer 1 to its final 3D position (it's already at 0,0,0 relative to stack)
	layer1Div.style.transform = 'translateZ(0px) translateY(0px)';

	// Animate Layer 2 to stack behind Layer 1
	const zOffsetFinalLayer2 = -55;
	const yOffsetFinalLayer2 = 15;
	layer2Div.style.transition = 'opacity 0.6s ease, transform 1s ease-out'; // Slower transform for stacking
	layer2Div.style.transform = `translateZ(${zOffsetFinalLayer2}px) translateY(${yOffsetFinalLayer2}px)`;

	await new Promise(resolve => setTimeout(resolve, 1200)); // Wait for stacking animation

	if (statusDiv) statusDiv.textContent = "¡Array 3D creado!";
	disableCreateButtons(false);
}


const satisfaccionVectorData = ["Satisfecho", "Neutral", "Insatisfecho", "Satisfecho", "Neutral"];
let currentFactorLevels = [];
let factorSatisfaccion;

function displayVectorOrLevelElements(containerId, dataArray, baseClass, codeDisplayId, rCode, isLevelTag = false) {
	const container = document.getElementById(containerId);
	if (!container) {
		return;
	}
	container.innerHTML = '';

	if (codeDisplayId) {
		const codeDisplay = document.getElementById(codeDisplayId);
		if (codeDisplay) {
			codeDisplay.textContent = rCode || '';
		}
	}

	let delay = 0;
	dataArray.forEach(item => {
		const el = document.createElement(isLevelTag ? 'span' : 'div');
		el.textContent = item === null ? "<NA>" : item;
		el.classList.add(isLevelTag ? 'level-tag' : 'vector-element', baseClass);
		if (item === null) el.classList.add('italic', 'text-red-500', 'dark:text-red-400');
		container.appendChild(el);
		setTimeout(() => {
			el.style.opacity = '1';
			el.style.transform = isLevelTag ? 'scale(1)' : 'translateY(0)';
		}, delay);
		delay += isLevelTag ? 150 : 100;
	});
}

function initializeFactorCharDemo() {
	const statusDiv = document.getElementById('factor-char-status');
	const levelsCodeDisplay = document.getElementById('levels-code-display');
	const btnShowChar = document.getElementById('btn-show-char');
	const btnConvertToFactor = document.getElementById('btn-convert-to-factor');
	const btnAddNewValue = document.getElementById('btn-add-new-value');

	function resetFactorDemoVisuals() {
		if (!document.getElementById('char-vector-display')) return;

		displayVectorOrLevelElements('char-vector-display', [], 'cell-character', 'char-code-display', '');
		displayVectorOrLevelElements('factor-vector-display', [], 'cell-factor-value', 'factor-code-display', '');

		const levelsTagsContainer = document.getElementById('levels-tags-container');
		if (levelsTagsContainer) levelsTagsContainer.innerHTML = '';
		const factorLevelsDisplay = document.getElementById('factor-levels-display');
		if (factorLevelsDisplay) factorLevelsDisplay.classList.add('hidden');

		displayVectorOrLevelElements('factor-integer-display', [], 'cell-integer', 'integer-code-display', '');
		displayVectorOrLevelElements('char-vector-new-display', [], 'cell-character', 'char-new-code-display', '');
		displayVectorOrLevelElements('factor-vector-new-display', [], 'cell-factor-value', 'factor-new-code-display', '');

		const factorNaNote = document.getElementById('factor-na-note');
		if (factorNaNote) factorNaNote.classList.add('hidden');

		if (levelsCodeDisplay) levelsCodeDisplay.textContent = '';
		if (statusDiv) statusDiv.textContent = '';
		if (btnConvertToFactor) btnConvertToFactor.disabled = true;
		if (btnAddNewValue) btnAddNewValue.disabled = true;
	}
	resetFactorDemoVisuals();

	if (btnShowChar) btnShowChar.addEventListener('click', async () => {
		resetFactorDemoVisuals();
		if (statusDiv) statusDiv.textContent = "Paso 1: Creando vector de caracteres...";
		await new Promise(resolve => setTimeout(resolve, 200));
		const rCode = `satisfaccion_char <- c("${satisfaccionVectorData.join('", "')}")`;
		displayVectorOrLevelElements('char-vector-display', satisfaccionVectorData, 'cell-character', 'char-code-display', rCode);
		if (statusDiv) statusDiv.textContent = "Vector de caracteres 'satisfaccion_char' mostrado.";
		if (btnConvertToFactor) btnConvertToFactor.disabled = false;
	});

	if (btnConvertToFactor) btnConvertToFactor.addEventListener('click', async () => {
		if (statusDiv) statusDiv.textContent = "Paso 2: Convirtiendo a factor...";
		await new Promise(resolve => setTimeout(resolve, 200));

		factorSatisfaccion = [...satisfaccionVectorData];
		currentFactorLevels = ["Insatisfecho", "Neutral", "Satisfecho"];

		const rCodeFactor = `factor_satisfaccion <- factor(satisfaccion_char, levels = c("${currentFactorLevels.join('", "')}"))`;
		displayVectorOrLevelElements('factor-vector-display', factorSatisfaccion, 'cell-factor-value', 'factor-code-display', rCodeFactor);
		await new Promise(resolve => setTimeout(resolve, factorSatisfaccion.length * 100 + 200));

		if (statusDiv) statusDiv.textContent = "Obteniendo niveles con levels()...";
		if (levelsCodeDisplay) levelsCodeDisplay.textContent = `levels(factor_satisfaccion)`;

		const factorLevelsDisplay = document.getElementById('factor-levels-display');
		if (factorLevelsDisplay) {
			factorLevelsDisplay.classList.remove('hidden');
			displayVectorOrLevelElements('levels-tags-container', currentFactorLevels, 'cell-factor', null, '', true);
		}
		await new Promise(resolve => setTimeout(resolve, currentFactorLevels.length * 150 + 200));

		if (statusDiv) statusDiv.textContent = "Viendo representación interna con as.integer()...";
		const integerRepresentation = factorSatisfaccion.map(val => currentFactorLevels.indexOf(val) + 1);
		const integerCodeDisplay = document.getElementById('integer-code-display');
		if (integerCodeDisplay) integerCodeDisplay.textContent = `as.integer(factor_satisfaccion)`;
		displayVectorOrLevelElements('factor-integer-display', integerRepresentation, 'cell-integer', null, '');

		if (statusDiv) statusDiv.textContent = "Factor creado y niveles identificados. Almacenamiento interno mostrado.";
		if (btnAddNewValue) btnAddNewValue.disabled = false;
	});

	if (btnAddNewValue) btnAddNewValue.addEventListener('click', async () => {
		const newValue = "Muy Satisfecho";
		if (statusDiv) statusDiv.textContent = `Paso 3: Intentando añadir '${newValue}'...`;
		await new Promise(resolve => setTimeout(resolve, 200));

		const newCharVector = [...satisfaccionVectorData, newValue];
		const rCodeCharNew = `satisfaccion_char_nuevo <- c(satisfaccion_char, "${newValue}")`;
		displayVectorOrLevelElements('char-vector-new-display', newCharVector, 'cell-character', 'char-new-code-display', rCodeCharNew);
		await new Promise(resolve => setTimeout(resolve, newCharVector.length * 100 + 100));

		const newFactorAttempt = [...factorSatisfaccion];
		let factorResultText = `# Intentar añadir "${newValue}" al factor:\n`;
		factorResultText += `factor_temp <- factor_satisfaccion\n`;
		factorResultText += `factor_temp[length(factor_temp) + 1] <- "${newValue}" # Esto genera NA si el nivel no existe`;

		const factorNaNote = document.getElementById('factor-na-note');
		if (currentFactorLevels.includes(newValue)) {
			newFactorAttempt.push(newValue);
			if (factorNaNote) factorNaNote.classList.add('hidden');
		} else {
			newFactorAttempt.push(null);
			if (factorNaNote) factorNaNote.classList.remove('hidden');
		}
		displayVectorOrLevelElements('factor-vector-new-display', newFactorAttempt, 'cell-factor-value', 'factor-new-code-display', factorResultText);
		if (statusDiv) statusDiv.textContent = `Comportamiento al añadir '${newValue}' a character vs factor.`;
	});
}

let currentNumericVector = []; // Variable global para el vector numérico actual
const numericVecData = [10, 20, 30, 40];
const charVecDataMain = ["R", "es", "genial"];
const logicalVecData = [true, false, true];

function initializeVectorDemos() {
	if (!document.getElementById('numeric-vector-display')) return;
	displayVectorOrLevelElements('numeric-vector-display', [], 'cell-numeric', 'numeric-vector-code', '');
	displayVectorOrLevelElements('char-vector-display-main', [], 'cell-character', 'char-vector-code', '');
	displayVectorOrLevelElements('logical-vector-display', [], 'cell-logical', 'logical-vector-code', '');
	displayVectorOrLevelElements('vector-op-display', [], 'cell-numeric', 'vector-op-code', '');
	const btnVectorOp = document.getElementById('btn-vector-op');
	if (btnVectorOp) btnVectorOp.disabled = true;
}

async function createVectorDemo(type) {
	const statusDiv = document.getElementById('vector-creation-status');
	if (!statusDiv) return;

	let data, displayId, cellClass, codeId, rCodeVar, rCodeString;
	const btnVectorOp = document.getElementById('btn-vector-op');

	// Limpiar SOLO el display del vector que se va a crear
	if (type === 'numeric') {
		displayVectorOrLevelElements('numeric-vector-display', [], 'cell-numeric', 'numeric-vector-code', '');
	} else if (type === 'character') {
		displayVectorOrLevelElements('char-vector-display-main', [], 'cell-character', 'char-vector-code', '');
	} else if (type === 'logical') {
		displayVectorOrLevelElements('logical-vector-display', [], 'cell-logical', 'logical-vector-code', '');
	}
	// No limpiar el display de operación aquí, solo cuando se crea un vector no numérico

	if (type === 'numeric') {
		data = numericVecData;
		displayId = 'numeric-vector-display';
		cellClass = 'cell-numeric';
		codeId = 'numeric-vector-code';
		rCodeVar = 'vector_num';
		rCodeString = `c(${data.join(', ')})`;
		currentNumericVector = [...data];
		if (btnVectorOp) btnVectorOp.disabled = false;
	} else {
		// Si se crea un vector no numérico, limpiar el vector numérico actual y deshabilitar el botón de operación
		currentNumericVector = [];
		if (btnVectorOp) btnVectorOp.disabled = true;
		displayVectorOrLevelElements('vector-op-display', [], 'cell-numeric', 'vector-op-code', ''); // Limpiar operación display

		if (type === 'character') {
			data = charVecDataMain;
			displayId = 'char-vector-display-main';
			cellClass = 'cell-character';
			codeId = 'char-vector-code';
			rCodeVar = 'vector_char';
			rCodeString = `c("${data.join('", "')}")`;
		} else if (type === 'logical') {
			data = logicalVecData;
			displayId = 'logical-vector-display';
			cellClass = 'cell-logical';
			codeId = 'logical-vector-code';
			rCodeVar = 'vector_log';
			rCodeString = `c(${data.map(String).join(', ')})`;
		} else {
			return;
		}
	}

	statusDiv.textContent = `Creando vector de tipo ${type}...`;
	await new Promise(resolve => setTimeout(resolve, 100));
	const fullRCode = `${rCodeVar} <- ${rCodeString}`;
	displayVectorOrLevelElements(displayId, data, cellClass, codeId, fullRCode);
	statusDiv.textContent = `Vector '${rCodeVar}' creado.`;
}

async function vectorizedOperationDemo() {
	if (currentNumericVector.length === 0) {
		alert("Primero crea el vector numérico haciendo clic en el botón 'Crear Vector Numérico'.");
		return;
	}
	const statusDiv = document.getElementById('vector-creation-status');
	const opDisplay = document.getElementById('vector-op-display');
	const opCodeDisplay = document.getElementById('vector-op-code');
	if (!statusDiv || !opDisplay || !opCodeDisplay) return;

	statusDiv.textContent = "Realizando operación vectorizada (vector_num + 5)...";
	opCodeDisplay.textContent = `resultado_op <- vector_num + 5`;

	opDisplay.innerHTML = '';
	currentNumericVector.forEach(val => {
		const el = document.createElement('div');
		el.textContent = val;
		el.classList.add('vector-element', 'cell-numeric');
		el.style.opacity = '1'; el.style.transform = 'translateY(0)';
		opDisplay.appendChild(el);
	});
	await new Promise(resolve => setTimeout(resolve, 500));


	const resultVector = currentNumericVector.map(x => x + 5);
	opDisplay.innerHTML = '';
	let delay = 0;
	resultVector.forEach((val) => {
		const el = document.createElement('div');
		el.textContent = val;
		el.classList.add('vector-element', 'cell-numeric', 'cell-animated-aparicion');
		opDisplay.appendChild(el);
		setTimeout(() => {
			el.style.opacity = '1';
			el.style.transform = 'scale(1) rotate(0deg)';
			el.classList.add('cell-highlight-temp');
			setTimeout(() => el.classList.remove('cell-highlight-temp'), 400);
		}, delay);
		delay += 150;
	});
	statusDiv.textContent = "Operación vectorizada completada.";
}

// Data para el ejemplo de Personas y Salarios
const dfVecNombresData = ["Ana", "Luis", "Eva", "Juan"];
const dfVecEdadesData = [28, 34, 22, 45];
const dfVecSalariosData = [510.000, 583.000, 850.000, 490.000];


function initializeDynamicDataFrameDemo() {
	if (!document.getElementById('df-vec-nombres')) return;
	displayVectorOrLevelElements('df-vec-nombres', [], 'cell-character', null, '');
	displayVectorOrLevelElements('df-vec-edades', [], 'cell-numeric', null, '');
	displayVectorOrLevelElements('df-vec-salarios', [], 'cell-numeric', null, ''); // Cambiado a nombres
	const table = document.getElementById('dynamic-dataframe-table');
	if (table) {
		const thead = table.getElementsByTagName('thead')[0];
		const tbody = table.getElementsByTagName('tbody')[0];
		if (thead) thead.innerHTML = '';
		if (tbody) tbody.innerHTML = '';
	}
	const dynamicDfCode = document.getElementById('dynamic-df-code');
	if (dynamicDfCode) dynamicDfCode.textContent = '';
	const dfCreationStatus = document.getElementById('df-creation-status');
	if (dfCreationStatus) dfCreationStatus.textContent = '';
	const btn = document.getElementById('btn-create-dynamic-df');
	if (btn) btn.disabled = false;
}

async function createDynamicDataFrame() {
	initializeDynamicDataFrameDemo();
	const statusDiv = document.getElementById('df-creation-status');
	const dynamicDfCode = document.getElementById('dynamic-df-code');
	const btn = document.getElementById('btn-create-dynamic-df');
	if (!statusDiv || !dynamicDfCode || !btn) return;

	btn.disabled = true;

	statusDiv.textContent = "Paso 1: Creando vectores individuales...";
	await new Promise(resolve => setTimeout(resolve, 200));

	displayVectorOrLevelElements('df-vec-nombres', dfVecNombresData, 'cell-character', null, '');
	await new Promise(resolve => setTimeout(resolve, dfVecNombresData.length * 100 + 100));

	displayVectorOrLevelElements('df-vec-edades', dfVecEdadesData, 'cell-numeric', null, '');
	await new Promise(resolve => setTimeout(resolve, dfVecEdadesData.length * 100 + 100));

	displayVectorOrLevelElements('df-vec-salarios', dfVecSalariosData, 'cell-numeric', null, '');
	await new Promise(resolve => setTimeout(resolve, dfVecSalariosData.length * 100 + 200));

	statusDiv.textContent = "Paso 2: Combinando vectores en un Data Frame...";
	dynamicDfCode.innerHTML = `
        <code># En R:</code><br>
        <code>nombres &lt;- c("${dfVecNombresData.join('", "')}")</code><br>
        <code>edades &lt;- c(${dfVecEdadesData.join(', ')})</code><br>
        <code>salarios &lt;- c(${dfVecSalariosData.map(s => s.toFixed(3)).join(', ')})</code><br>
        <code>personas_df &lt;- data.frame(Nombre = nombres, Edad = edades, Salario = salarios)</code>
    `;

	const table = document.getElementById('dynamic-dataframe-table');
	const thead = table.getElementsByTagName('thead')[0];
	const tbody = table.getElementsByTagName('tbody')[0];
	thead.innerHTML = ''; tbody.innerHTML = '';

	const headerRow = thead.insertRow();
	const headers = ["Nombre (Carácter)", "Edad (Numérico)", "Salario (Numérico)"];
	headers.forEach(text => {
		const th = document.createElement('th');
		th.textContent = text;
		th.classList.add('df-col-animated-entrada');
		headerRow.appendChild(th);
		setTimeout(() => {
			th.style.opacity = '1';
			th.style.transform = 'translateY(0)';
		}, 200);
	});
	await new Promise(resolve => setTimeout(resolve, 800));

	for (let i = 0; i < dfVecNombresData.length; i++) {
		const row = tbody.insertRow();
		const rowData = [
			{ value: dfVecNombresData[i], class: 'cell-character' },
			{ value: dfVecEdadesData[i], class: 'cell-numeric' },
			{ value: dfVecSalariosData[i].toFixed(3), class: 'cell-numeric' }
		];

		let cellDelay = 0;
		rowData.forEach(data => {
			const cell = row.insertCell();
			cell.textContent = data.value;
			cell.classList.add(data.class, 'cell-animated-aparicion');
			setTimeout(() => {
				cell.style.opacity = '1';
				cell.style.transform = 'scale(1) rotate(0deg)';
			}, cellDelay);
			cellDelay += 100;
		});
		await new Promise(resolve => setTimeout(resolve, cellDelay + 50));
	}
	statusDiv.textContent = "¡Data Frame 'personas_df' construido!";
	btn.disabled = false;
}
