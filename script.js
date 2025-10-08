// Interactive functionality for TCM Intake application

document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
    initializePatientSelection();
    initializeMenuNavigation();
    initializeCopyButtons();
    initializeTCMDropdown();
});

// Smooth scrolling for all scrollable areas
function initializeSmoothScrolling() {
    const scrollableElements = document.querySelectorAll('.patients-section, .body-systems-menu, .content-panel, .notes-content');

    scrollableElements.forEach(element => {
        element.style.scrollBehavior = 'smooth';
    });
}

// Patient selection functionality
function initializePatientSelection() {
    const patientItems = document.querySelectorAll('.patient-item');

    patientItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            patientItems.forEach(p => p.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Update header patient info
            const badge = this.querySelector('.patient-badge');
            const time = this.querySelector('.patient-time');

            if (badge && time) {
                document.querySelector('.patient-name').textContent = badge.textContent;
                document.querySelector('.patient-info .time').textContent = time.textContent;
            }
        });
    });
}

// Menu navigation functionality
function initializeMenuNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const menuItems = document.querySelectorAll('.menu-item');

    // Navigation items click
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from menu items
            menuItems.forEach(m => m.classList.remove('active'));

            // Scroll to top of content panel
            const contentPanel = document.querySelector('.content-panel');
            if (contentPanel) {
                contentPanel.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Menu items click
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(m => m.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Scroll to relevant section in notes
            const itemText = this.textContent.toLowerCase();
            scrollToRelevantSection(itemText);
        });
    });
}

// Scroll to relevant section in the notes panel
function scrollToRelevantSection(sectionName) {
    const notesContent = document.querySelector('.notes-content');
    const sections = document.querySelectorAll('.note-section');

    sections.forEach(section => {
        const sectionHeader = section.querySelector('.section-header h3');
        if (sectionHeader) {
            const headerText = sectionHeader.textContent.toLowerCase();

            if (headerText.includes(sectionName) || sectionName.includes('tongue') && headerText.includes('tongue') || sectionName.includes('pulse') && headerText.includes('pulse')) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

// Copy button functionality
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();

            // Find the content to copy
            let textToCopy = '';
            const parentSection = this.closest('.note-section, .note-item');

            if (parentSection) {
                const noteText = parentSection.querySelector('.note-text, .diagnosis-text, .treatment-text');
                if (noteText) {
                    textToCopy = noteText.textContent;
                } else {
                    // Try to get all text content from the section
                    textToCopy = parentSection.textContent.replace(/📋 Copy/g, '').trim();
                }
            }

            // Copy to clipboard
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Show feedback
                    const originalText = this.textContent;
                    this.textContent = '✓ Copied';
                    this.style.color = '#00B894';
                    this.style.borderColor = '#00B894';

                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                        this.style.borderColor = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            }
        });
    });
}

// TCM dropdown toggle
function initializeTCMDropdown() {
    const dropdownItem = document.querySelector('.dropdown-item');
    const bodySystemsMenu = document.querySelector('.body-systems-menu');
    let isOpen = true;

    if (dropdownItem && bodySystemsMenu) {
        dropdownItem.addEventListener('click', function() {
            isOpen = !isOpen;

            if (isOpen) {
                bodySystemsMenu.style.maxHeight = '300px';
                bodySystemsMenu.style.opacity = '1';
                this.querySelector('.dropdown-icon').textContent = '⌄';
            } else {
                bodySystemsMenu.style.maxHeight = '0';
                bodySystemsMenu.style.opacity = '0';
                this.querySelector('.dropdown-icon').textContent = '›';
            }
        });
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    const activeElement = document.activeElement;

    // Navigate menu items with arrow keys
    if (activeElement.classList.contains('menu-item')) {
        const menuItems = Array.from(document.querySelectorAll('.menu-item'));
        const currentIndex = menuItems.indexOf(activeElement);

        if (e.key === 'ArrowDown' && currentIndex < menuItems.length - 1) {
            e.preventDefault();
            menuItems[currentIndex + 1].focus();
            menuItems[currentIndex + 1].click();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            menuItems[currentIndex - 1].focus();
            menuItems[currentIndex - 1].click();
        }
    }
});

// Auto-save indicator simulation
function simulateAutoSave() {
    const autoSavingElement = document.querySelector('.auto-saving');

    if (autoSavingElement) {
        setInterval(() => {
            autoSavingElement.style.opacity = '0.5';
            setTimeout(() => {
                autoSavingElement.style.opacity = '1';
            }, 1000);
        }, 5000);
    }
}

simulateAutoSave();

// Update time badge
function updateTimeBadge() {
    const timeBadge = document.querySelector('.time-badge');

    if (timeBadge) {
        setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeBadge.textContent = `${hours}:${minutes}`;
        }, 60000); // Update every minute
    }
}

updateTimeBadge();
