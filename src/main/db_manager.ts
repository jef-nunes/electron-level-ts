// db_manager.ts
import { Level } from 'level';
// Class responsible for interacting with the LevelDB database.
//
// This class is exposed to the Electron main process, which 
// receives asynchronous requests from the renderer to invoke
// the database interaction methods.
class DatabaseManager
{
    private static leveldb = new Level('./database/leveldb', { valueEncoding: 'json' });
    private static isopen: boolean = false;

    // Opens the database if it's not already open
    static async open(): Promise<boolean>
    {
        if (!DatabaseManager.isopen)
        {
            try
            {
                DatabaseManager.isopen = true;
                console.log("Level database opened successfully.");
                return true;
            }
            catch (error)
            {
                console.error("Failed to open Level database:", error);
                return false;
            }
        }
        else
        {
            console.log("Level database is already open.");
            return true;
        }
    }

    // Inserts a key-value pair into the database
    static async put(key: string, value: string): Promise<boolean>
    {
        await this.open(); // Ensures the database is open

        try
        {
            await this.leveldb.put(key, value);
            console.log(`Inserted key-value pair: ${key} = ${value}`);
            return true;
        }
        catch (err)
        {
            console.error('Error during insert:', err);
            return false;
        }
    }

    // Retrieves the value associated with the given key from the database
    static async get(key: string): Promise<string | undefined>
    {
        await this.open();

        try
        {
            const value = await this.leveldb.get(key);
            console.log(`Retrieved ${key}: ${value}`);
            return value;
        }
        catch (err)
        {
            console.error('Error during retrieval:', err);
            return undefined;
        }
    }

    // Deletes the key-value pair associated with the given key from the database
    static async del(key: string): Promise<boolean>
    {
        await this.open();

        try
        {
            await this.leveldb.del(key);
            console.log(`Deleted key: ${key}`);
            return true;
        }
        catch (err)
        {
            console.error('Error during deletion:', err);
            return false;
        }
    }

    // Closes the database if it's open
    static async close(): Promise<void>
    {
        if (DatabaseManager.isopen)
        {
            await this.leveldb.close();
            DatabaseManager.isopen = false;
            console.log("Level database closed successfully.");
        }
        else
        {
            console.log("Level database is already closed.");
        }
    }
}

export { DatabaseManager };
