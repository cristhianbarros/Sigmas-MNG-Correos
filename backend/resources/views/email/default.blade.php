<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $email->subject }}</title>
    <style type="text/css">{!! $email->template->styles !!}</style>
</head>
<body>
    {!! $email->html !!}
    {!! $email->template->footer!!}
</body>
</html>
