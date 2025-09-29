// 代码生成时间: 2025-09-30 03:51:27
// Define the FilePermissionManager class
class FilePermissionManager {
    constructor() {
        this.files = {}; // Store file permissions in an object
    }

    /**
     * Adds a new file with permissions
     * @param {string} filename - The name of the file
     * @param {string} permissions - The permissions to set (e.g., 'rwx', 'r-x', etc.)
     */
    addFile(filename, permissions) {
        if (!filename || !permissions) {
            throw new Error('Filename and permissions must be provided.');
        }

        // Validate permissions format
        if (permissions.length !== 3 || !/^[rwx-]{3}$/.test(permissions)) {
            throw new Error('Invalid permissions format. Use rwx, r-x, etc.');
        }

        this.files[filename] = {
            permissions: permissions,
            owner: 'user1', // Default owner
            group: 'group1' // Default group
        };

        console.log(`File ${filename} added with permissions ${permissions}`);
    }

    /**
     * Changes the permissions of a file
     * @param {string} filename - The name of the file
     * @param {string} newPermissions - The new permissions to set (e.g., 'rwx', 'r-x', etc.)
     */
    changePermissions(filename, newPermissions) {
        if (!this.files[filename]) {
            throw new Error('File not found.');
        }

        if (!newPermissions) {
            throw new Error('New permissions must be provided.');
        }

        // Validate new permissions format
        if (newPermissions.length !== 3 || !/^[rwx-]{3}$/.test(newPermissions)) {
            throw new Error('Invalid permissions format. Use rwx, r-x, etc.');
        }

        this.files[filename].permissions = newPermissions;
        console.log(`Permissions for file ${filename} changed to ${newPermissions}`);
    }

    /**
     * Removes a file
     * @param {string} filename - The name of the file
     */
    removeFile(filename) {
        if (!this.files[filename]) {
            throw new Error('File not found.');
        }

        delete this.files[filename];
        console.log(`File ${filename} removed`);
    }

    /**
     * Gets the permissions of a file
     * @param {string} filename - The name of the file
     * @returns {string} The permissions of the file
     */
    getFilePermissions(filename) {
        if (!this.files[filename]) {
            throw new Error('File not found.');
        }

        return this.files[filename].permissions;
    }

    /**
     * Visualizes the file permissions using D3
     */
    visualizePermissions() {
        // Use D3 to create a simple visualization
        const svg = d3.select('body').append('svg')
            .attr('width', 500)
            .attr('height', 100);

        const files = Object.keys(this.files);

        files.forEach((filename, index) => {
            const file = this.files[filename];
            const permissions = file.permissions;

            svg.append('rect')
                .attr('x', index * 100 + 10)
                .attr('y', 10)
                .attr('width', 80)
                .attr('height', 80)
                .attr('fill', 'lightblue');

            svg.append('text')
                .attr('x', index * 100 + 50)
                .attr('y', 90)
                .text(`${filename}: ${permissions}`);
        });
    }
}

// Example usage:
const manager = new FilePermissionManager();

try {
    manager.addFile('example.txt', 'rwx');
    manager.addFile('script.js', 'r-x');
    console.log('Permissions for example.txt:', manager.getFilePermissions('example.txt'));
    manager.changePermissions('example.txt', 'rw-');
    manager.removeFile('script.js');
    manager.visualizePermissions();
} catch (error) {
    console.error(error.message);
}