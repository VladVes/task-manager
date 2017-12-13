#! /usr/bin/env node

import app from '../';

app().listen(process.env.PORT || 5000);
