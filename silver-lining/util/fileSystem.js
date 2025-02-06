import * as FileSystem from 'expo-file-system';

/**
 * Ensures that the directories exist by checking and creating them if necessary.
 * @param {string[]} dirNames - An array of directory paths to ensure exist.
 */
export const ensureDirsExist = async (dirNames) => {
    for (const dir of dirNames) {
        try {
            const dirInfo = await FileSystem.getInfoAsync(dir);
            if (!dirInfo.exists) {
                console.log(`Creating directory: ${dir}`);
                await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
            }
        } catch (error) {
            console.error(`Error creating directory ${dir}:`, error);
        }
    }
};

/**
 * Ensures that the user file exists and creates it with default data if not.
 * @param {string} userFilePath - Path to the user JSON file.
 */
export const ensureUserFilePath = async (userFilePath) => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(userFilePath);
        if (!fileInfo.exists) {
            console.log("User file does not exist. Creating...");
            const defaultData = {
                profile_data: {
                    first: "Bryan",
                    last: "Wilson",
                    picture: "profile.png",
                },
                posts: [],
            };
            await FileSystem.writeAsStringAsync(userFilePath, JSON.stringify(defaultData, null, 2));
        }
    } catch (error) {
        console.error("Error ensuring user file exists:", error);
    }
};
