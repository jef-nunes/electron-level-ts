// index.ts

// Ensure the import with '.js' extension to avoid errors
import { DatabaseRequest } from './db_request.js';

// Example of database interaction using
// the ipc renderer defined in ./db_request.ts
class ExamplePanel
{
    fakeTerminal: HTMLDivElement;
    inputLevelDBKey: HTMLInputElement;
    inputLevelDBValue: HTMLInputElement;
    btnPut: HTMLButtonElement;
    btnGet: HTMLButtonElement;
    btnDel: HTMLButtonElement;
    
    constructor()
    {
        this.fakeTerminal = document.getElementById("fake-terminal") as HTMLDivElement;
        this.inputLevelDBKey = document.getElementById("input-db-key") as HTMLInputElement;
        this.inputLevelDBValue = document.getElementById("input-db-value") as HTMLInputElement;
        this.btnPut = document.getElementById("btn-db-put") as HTMLButtonElement;
        this.btnGet = document.getElementById("btn-db-get") as HTMLButtonElement;
        this.btnDel = document.getElementById("btn-db-del") as HTMLButtonElement;
        
        this.btnPut.addEventListener("click", this.handleClickBtnPut.bind(this));
        this.btnGet.addEventListener("click", this.handleClickBtnGet.bind(this));
        this.btnDel.addEventListener("click", this.handleClickBtnDel.bind(this));
    }

    // Prints the versions of the technologies used in the project to the fake terminal
    fakeTermPrintVersions(): void
    {
        const base_text = "Technology versions used in the project:\n"
        const version_node = `NodeJS: ${proj_versions.node()}\n`;
        const version_chrome = `Chrome: ${proj_versions.chrome()}\n`;
        const version_electron = `Electron: ${proj_versions.electron()}\n`;
        const span = document.createElement('span');
        
        span.innerText = base_text + version_node + version_chrome + version_electron;
        span.className = "term-text-comment";
        this.fakeTerminal.appendChild(span);
    }

    // Handles the 'put' button click event
    async handleClickBtnPut()
    {
        const br = document.createElement('br');
        const span = document.createElement('span');
        const success = await DatabaseRequest.put(
            this.inputLevelDBKey.value,
            this.inputLevelDBValue.value
        );
        
        if (success)
        {
            span.innerText = `New key-value pair added to the database {${this.inputLevelDBKey.value}: ${this.inputLevelDBValue.value}}`;
            span.className = 'term-text-default';
        }
        else
        {
            span.innerText = "Error adding key-value pair to the database.";
            span.className = 'term-text-error';
        }
        
        this.fakeTerminal.appendChild(br);
        this.fakeTerminal.appendChild(span);
    }

    // Handles the 'get' button click event
    async handleClickBtnGet()
    {
        const br = document.createElement('br');
        const span = document.createElement('span');
        const response = await DatabaseRequest.get(this.inputLevelDBKey.value);
        
        if (response !== undefined)
        {
            span.innerText = `Value for ${this.inputLevelDBKey.value}: ${response}`;
            span.className = 'term-text-default';
        }
        else
        {
            span.innerText = "Error retrieving value from the database.";
            span.className = 'term-text-error';
        }
        
        this.fakeTerminal.appendChild(br);
        this.fakeTerminal.appendChild(span);
    }

    // Handles the 'delete' button click event
    async handleClickBtnDel()
    {
        const br = document.createElement('br');
        const span = document.createElement('span');
        const success = await DatabaseRequest.del(this.inputLevelDBKey.value);
        
        if (success)
        {
            span.innerText = `The key '${this.inputLevelDBKey.value}' has been deleted from the database.`;
            span.className = 'term-text-default';
        }
        else
        {
            span.innerText = "Error deleting value from the database.";
            span.className = 'term-text-error';
        }
        
        this.fakeTerminal.appendChild(br);
        this.fakeTerminal.appendChild(span);
    }
}

// Initializes the ExamplePanel and prints the versions on the fake terminal
function main()
{
    const panel = new ExamplePanel();
    panel.fakeTermPrintVersions();
}

document.addEventListener("DOMContentLoaded", main);
