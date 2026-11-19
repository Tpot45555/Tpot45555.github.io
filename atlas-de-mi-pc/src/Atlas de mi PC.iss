; Instalador de Atlas de mi PC (Inno Setup 6).
; No se compila a mano: lo llama "Crear instalador.bat", que antes construye
; la aplicacion en dist-app\ con PyInstaller.

#define Nombre    "Atlas de mi PC"
#define Version   "1.0.0"
#define Autor     "Enrique Christensen Betancourt"
#define Web       "https://github.com/Tpot45555"
#define Ejecutable "Atlas de mi PC.exe"

[Setup]
AppId={{8F3C1A27-4D62-4B19-9E55-7C0A2D4E1B83}
AppName={#Nombre}
AppVersion={#Version}
AppVerName={#Nombre} {#Version}
AppPublisher={#Autor}
AppPublisherURL={#Web}
AppSupportURL={#Web}
VersionInfoVersion={#Version}
VersionInfoCompany={#Autor}
VersionInfoDescription=Instalador de {#Nombre}

; Se instala para el usuario actual: no pide permisos de administrador.
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
DefaultDirName={autopf}\{#Nombre}
DefaultGroupName={#Nombre}
DisableProgramGroupPage=yes
AllowNoIcons=yes

OutputDir=.
OutputBaseFilename=Atlas de mi PC - Instalador
SetupIconFile=atlas.ico
UninstallDisplayName={#Nombre}
UninstallDisplayIcon={app}\{#Ejecutable}
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern
; Si la aplicacion esta abierta, Windows la cierra antes de actualizarla.
CloseApplications=yes
RestartApplications=no

[Languages]
Name: "es"; MessagesFile: "compiler:Languages\Spanish.isl"

[Tasks]
Name: "escritorio"; Description: "Crear un acceso directo en el escritorio"; GroupDescription: "Accesos directos:"

[Files]
Source: "dist-app\{#Nombre}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#Nombre}"; Filename: "{app}\{#Ejecutable}"
Name: "{group}\Desinstalar {#Nombre}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#Nombre}"; Filename: "{app}\{#Ejecutable}"; Tasks: escritorio

[Run]
Filename: "{app}\{#Ejecutable}"; Description: "Abrir {#Nombre} al terminar"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
; La ventana propia de la aplicacion guarda aqui su perfil; al desinstalar se va con ella.
Type: filesandordirs; Name: "{localappdata}\AtlasDeMiPC"
