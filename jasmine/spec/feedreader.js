"use strict";

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Validate that each feed has a non-empty URL
         */
         it('Verify that feed conatins a non-empty URL', function() {
            // Loop through each feed
            allFeeds.forEach(function(feed) {

            // Validate that URL is defined
            expect(feed.url).toBeDefined();

            // Validate that URL is non-empty
            expect(feed.url.length).not.toBe(0);
            });
        });

        /**
         * Verify that each feed has a non-empty name.
         */
        it('Verify that each feed has a non-empty name', function() {
            // Loop through each feed
            allFeeds.forEach(function(feed) {

            // Make sure that `NAME` is defined
            expect(feed.name).toBeDefined();

            // Ensure that it is NOT empty
            expect(feed.name.length).not.toBe(0);
            });
        }); 
    });


    /*A test suite named "The menu" */
    describe('The menu', function() {
        /* Verify that ensures the menu element is
         * hidden by default. 
         */
        it('Verify that ensures the menu element is hidden by default.', function() {
            // Check if the `body` contains the `menu-hidden` class
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });

        /* Verify that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Verify that ensures the menu changes visibility when the menu icon is clicked.', function() {
            const menuButton = document.querySelector(".menu-icon-link");
            const clickEvent = new CustomEvent("click");

            menuButton.dispatchEvent(clickEvent); // Click
            expect(document.body.classList.toggle("menu-hidden")).toBe(true); // Show Menu
            menuButton.dispatchEvent(clickEvent); // Click Again
            expect(document.body.classList.toggle("menu-hidden")).toBe(true); // Hide Menu
        });

    });

    /*A test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Verify that  when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        // Take 2,5s to load the default feed [Async]
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Make sure that it returns atleast one feed
        it('Verify that feed container contains at least one feed', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    /**
     * The test suite to validate 'New Feed Selection'.
     */
    describe('New Feed Selection', function() {
        /* Verify that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let currentContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                // Store the current content
                currentContent = document.querySelector(".feed").innerHTML;
                // Load another Feed
                loadFeed(1, done);
            });
        });
        it('Verify that when a new feed is loaded by the loadFeed function that the content actually changes', function() {
            
            // Compare the current feed's container with the previous one
            expect(document.querySelector(".feed").innerHTML).not.toBe(currentContent);
        });
    });
}());
