# File name related functions

# Description
## Remove unusable characters from the file name. In other words, it only returns the available strings.
<br/><br/>

# Install
```
npm i @appres/filename
```

## Import
```
const FileName = require('@appres/filename');

or

import { FileName } from '@appres/filename';

```

## Usage
```
let filename = FileName.valid("some_file_name.txt");
let filename = FileName.valid("*?some_...file_name.txt.");

Return will be same to "some_file_name.txt"

```

