
<h1>CREATIONS</h1>
<hr />
<div class="creations-section">
	<div class="creations-scroller">
		<div class="creations-scroller-scroll">
			<?php
				
				$folderDir = "Creations/";

				$allFolders = scandir($folderDir);
				
				$folders = array_diff($allFolders, array('.', '..'));
				
				foreach ($folders as $key => $value) {
					$description = file_get_contents($folderDir . $value . "/description.html");
					$title = file_get_contents($folderDir . $value . "/title.html");
					$image = "Creations/" . $value . "/preview.png";
					echo "<div onclick='openCreationWindow(".'"'.$value.'"'.",false,true,true,this);' class='creation' ><div class='creation-title'>$title</div><img src='$image'/><div class='creation-description'>$description</div></div>";
				}
			?>
		</div>
	</div>
	<div class="creations-pages"><ul><li class="active">1</li></ul></div>
</div>