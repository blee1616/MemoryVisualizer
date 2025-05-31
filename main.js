const memory = {
    stack: [],
    heap: [],
    history: [],
    pointers: [] // To track pointers from stack to heap
};

const actionButtons = document.querySelectorAll('.actions-btn');
const historyContent = document.querySelector('.history-content');
const stackContent = document.querySelector('.stack-content');
const heapContent = document.querySelector('.heap-content');

// Generate a unique ID for each memory item
let nextId = 1;

actionButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const action = event.target.textContent;
        addToHistory(action);
        switch (action) {
            case 'Add character to stack':
                addCharToStack();
                break;
            case 'Add integer to stack':
                addIntToStack();
                break;
            case 'Add character array to stack':
                addCharArrayToStack();
                break;
            case 'Add character pointer to heap':
                addCharPointerToHeap();
                break;
            case 'Add integer pointer to heap':
                addIntPointerToHeap();
                break;
            case 'Add character array to heap':
                addCharArrayToHeap();
                break;
        }
        updateDisplay();
    });
});

function addToHistory(action) {
    const timestamp = new Date().toLocaleTimeString();
    memory.history.push(`${timestamp}: ${action}`);
}

const charPrefixes = ['ch', 'c', 'character', 'letter', 'symbol'];
const intPrefixes = ['num', 'n', 'integer', 'count', 'value'];
const arrayPrefixes = ['arr', 'buffer', 'data', 'str', 'text'];
const ptrPrefixes = ['ptr', 'p', 'ref', 'address', 'handle'];

// Counter for each type to ensure unique names
const counters = {
    char: 1,
    int: 1,
    charArray: 1,
    charPtr: 1,
    intPtr: 1,
    charArrayPtr: 1
};

// Helper to generate unique variable names
function generateVarName(type) {
    let prefix;
    let counter;
    
    switch(type) {
        case 'char':
            prefix = charPrefixes[Math.floor(Math.random() * charPrefixes.length)];
            counter = counters.char++;
            break;
        case 'int':
            prefix = intPrefixes[Math.floor(Math.random() * intPrefixes.length)];
            counter = counters.int++;
            break;
        case 'char[]':
            prefix = arrayPrefixes[Math.floor(Math.random() * arrayPrefixes.length)];
            counter = counters.charArray++;
            break;
        case 'char*':
            prefix = ptrPrefixes[Math.floor(Math.random() * ptrPrefixes.length)];
            counter = counters.charPtr++;
            break;
        case 'int*':
            prefix = ptrPrefixes[Math.floor(Math.random() * ptrPrefixes.length)];
            counter = counters.intPtr++;
            break;
        case 'char*[]':
            prefix = ptrPrefixes[Math.floor(Math.random() * ptrPrefixes.length)];
            counter = counters.charArrayPtr++;
            break;
        default:
            prefix = 'var';
            counter = nextId;
    }
    
    return `${prefix}${counter}`;
}

function addCharToStack() {
    const char = prompt('Enter a character:', 'A');
    if (char) {
        const varName = generateVarName('char');
        memory.stack.push({
            id: nextId++,
            type: 'char',
            value: char.charAt(0),
            name: varName
        });
    }
}

function addIntToStack() {
    const int = prompt('Enter an integer:', '42');
    if (int) {
        const varName = generateVarName('int');
        memory.stack.push({
            id: nextId++,
            type: 'int',
            value: parseInt(int, 10),
            name: varName
        });
    }
}

function addCharArrayToStack() {
    const chars = prompt('Enter a string:', 'Hello');
    if (chars) {
        const varName = generateVarName('char[]');
        memory.stack.push({
            id: nextId++,
            type: 'char[]',
            value: chars,
            name: varName
        });
    }
}

function addCharPointerToHeap() {
    const char = prompt('Enter a character:', 'B');
    if (char) {
        // Add to heap
        const heapId = nextId++;
        const heapVarName = generateVarName('char');
        memory.heap.push({
            id: heapId,
            type: 'char',
            value: char.charAt(0),
            name: `*${heapVarName}` // Dereference notation
        });
        
        // Add pointer to stack
        const varName = generateVarName('char*');
        const stackId = nextId++;
        memory.stack.push({
            id: stackId,
            type: 'char*',
            value: varName,
            name: varName,
            pointsTo: heapId
        });
        
        // Track the pointer relationship
        memory.pointers.push({
            fromId: stackId,
            toId: heapId
        });
    }
}

function addIntPointerToHeap() {
    const int = prompt('Enter an integer:', '100');
    if (int) {
        // Add to heap
        const heapId = nextId++;
        const heapVarName = generateVarName('int');
        memory.heap.push({
            id: heapId,
            type: 'int',
            value: parseInt(int, 10),
            name: `*${heapVarName}` // Dereference notation
        });
        
        // Add pointer to stack
        const varName = generateVarName('int*');
        const stackId = nextId++;
        memory.stack.push({
            id: stackId,
            type: 'int*',
            value: varName,
            name: varName,
            pointsTo: heapId
        });
        
        // Track the pointer relationship
        memory.pointers.push({
            fromId: stackId,
            toId: heapId
        });
    }
}

function addCharArrayToHeap() {
    const chars = prompt('Enter a string:', 'Dynamic string');
    if (chars) {
        // Add to heap
        const heapId = nextId++;
        const heapVarName = generateVarName('char[]');
        memory.heap.push({
            id: heapId,
            type: 'char[]',
            value: chars,
            name: `*${heapVarName}` // Dereference notation
        });
        
        // Add pointer to stack
        const varName = generateVarName('char*[]');
        const stackId = nextId++;
        memory.stack.push({
            id: stackId,
            type: 'char*[]',
            value: varName,
            name: varName,
            pointsTo: heapId
        });
        
        // Track the pointer relationship
        memory.pointers.push({
            fromId: stackId,
            toId: heapId
        });
    }
}

// Update the display
function updateDisplay() {
    // Update history
    historyContent.innerHTML = memory.history.map(item => `<div class="history-item">${item}</div>`).join('');
    
    // Update stack
    stackContent.innerHTML = memory.stack.map(item => {
        let html = `<div class="memory-block stack-block" data-id="${item.id}">
            <div class="variable-name">${item.name}</div>
            <div class="type">${item.type}</div>
            <div class="value">${item.value}</div>`;
        
        if (item.pointsTo) {
            const pointedItem = memory.heap.find(h => h.id === item.pointsTo);
            if (pointedItem) {
                html += `<div class="pointer">Points to ${pointedItem.type} in heap</div>`;
            }
        }
        
        html += '</div>';
        return html;
    }).join('');
    
    // Update heap
    heapContent.innerHTML = memory.heap.map(item => 
        `<div class="memory-block heap-block" data-id="${item.id}">
            <div class="variable-name">${item.name || 'anonymous'}</div>
            <div class="type">${item.type}</div>
            <div class="value">${item.value}</div>
         </div>`
    ).join('');
    
    // Scroll history to bottom
    historyContent.scrollTop = historyContent.scrollHeight;
}

// Initialize display
updateDisplay();