Required Version

    node >=14.x.x
    npm >= 6.x.x

How to Run the Application

    Open the command line and navigate to the project directory.
    Run the following command to set up the project globally:

        npm link

    Once linked, you can run the script using the following command:

        decodeCronExpression "*/15 0 1,15 * 1-5 /usr/bin/find"
