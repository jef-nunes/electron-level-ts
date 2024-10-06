// The 'db' variable is exposed by the preload script.
// This class runs in the IPC Renderer (browser) context,
// meaning it communicates with the IPC Main (Node.js),
// which handles database operations via the 'db_request' script.

export class DatabaseRequest
{
    static async put(key: string, value: any): Promise<boolean>
    {
        try
        {
            // The response is a bool indicating success or failure.
            const success = await db.putData(key, value);
            if (success)
            {
                console.log("Key");
                console.log(`${key}: ${value}`);
                return true;
            }
            else
            {
                console.log("Failed to save key-value pair to LevelDB.");
                return false;
            }
        }
        catch (error)
        {
            console.error('Error saving data to LevelDB:', error);
            throw error;
        }
    }

    static async get(key: string): Promise<any>
    {
        try
        {
            // The response is the value associated with the key, or undefined if the key doesn't exist.
            const value = await db.getData(key);
            if (value !== undefined)
            {
                console.log(`Data retrieved from LevelDB for key '${key}': ${value}`);
                return value;
            }
            else
            {
                console.log(`No data found for key '${key}' in LevelDB.`);
                return undefined;
            }
        }
        catch (error)
        {
            console.error('Error retrieving data from LevelDB:', error);
            throw error;
        }
    }

    static async del(key: string): Promise<boolean>
    {
        try
        {
            // The response is a bool indicating whether the key was successfully deleted.
            const success = await db.deleteData(key);
            if (success)
            {
                console.log(`Key '${key}' was successfully deleted from the database.`);
                return true;
            }
            else
            {
                console.log(`Failed to delete key '${key}' from the database.`);
                return false;
            }
        }
        catch (error)
        {
            console.error('Error deleting key from LevelDB:', error);
            throw error;
        }
    }
}
