import React from 'react';
import './App.scss';

import { Box, Stack } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ContactCard from './components/ContactCard/ContactCard';


function App() {

    return (
        <Box className="App">
            <Stack direction={'row'} gap={2} height={"100%"}>
                <ContactCard name='John Doe' email='john@doe.com' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl ut nisl. Sed euismod, nisl quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl ut nisl.' image='https://picsum.photos/140/88' />
            </Stack>

        </Box>
    );
}

export default App;
