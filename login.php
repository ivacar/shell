<?php
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario = $_POST['usuario'] ?? '';
    $password = $_POST['password'] ?? '';

    // Simulación de login simple
    if ($usuario === 'admin@shell.com' && $password === '123456') {
        echo json_encode([
            'status' => 'success',
            'message' => 'Con cada litro gana más',
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Credenciales inválidas',
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Método no permitido',
    ]);
}
?>
